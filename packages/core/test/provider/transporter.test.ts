import {TestIframe, TestTransporter} from "../mocks";
import {Iframe, randomId, subjectBuilder, Transporter} from "../../src";
import {BASE_URL} from '../constants';
import sinon from 'sinon';
import {lastValueFrom, throwError} from "rxjs";
import {filter, map, take, tap} from "rxjs/operators";
import {RequestType} from "iceteaid-type";

test ('Initialize Transporter', () => {
    const transporter = new (Transporter as any)(BASE_URL, new (Iframe as any)(BASE_URL, 'abc'));
    expect(transporter).toBeInstanceOf(Transporter);
    expect(transporter.post).toBeDefined();
});

function createResponse(id: string) {
    return {id, payload: {err: false, message: 'Okay test'}}
}

function createResponseError(id: string) {
    return {id, payload: {err: true, message: 'No! Not okay'}}
}

async function mockPostMethod (transporter: Transporter, request: Record<string, any>, response: Record<string, any>) {
    const { subject } = subjectBuilder((transporter as any).iframe.messageHandler)

    transporter.post = sinon.spy((requestType: RequestType, payload: Record<string, any>) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                subject.next(response)
                resolve()
            }, 1000)
        })
    });
    transporter.post(request.requestType, request.payload)
    return await lastValueFrom(subject.asObservable().pipe(
        filter(message => !!message && message.id === request.id),
        map(message => {
            if (message.payload.err) return lastValueFrom(throwError(message));
            return message;
        }),
        take(1),
        tap(() => {
            (transporter as any).iframe.messageHandler.delete(request.id);
        })
    ))
}

test('Logic post function', async () => {
    const transporter = new TestTransporter(BASE_URL, new (TestIframe as any)(BASE_URL, 'abc'));
    const id = randomId();
    const testRequest = {id, requestType: 'TEST_REQUEST', payload: {message: 'Hi! Im test'}}
    const expectedResponse = await mockPostMethod(transporter, testRequest, createResponse(id));
    expect(expectedResponse).toStrictEqual(createResponse(id));
    expect((transporter as any).iframe.messageHandler.get(id)).toBe(undefined);
});

test('Throw error when err is true', async () => {
    const transporter = new TestTransporter(BASE_URL, new (TestIframe as any)(BASE_URL, 'abc'));
    const id = randomId();
    const testRequest = {id, requestType: 'TEST_REQUEST', payload: {message: 'Hi! Im test'}}
    await expect(mockPostMethod(transporter, testRequest, createResponseError(id))).rejects.toStrictEqual(createResponseError(id));
    expect((transporter as any).iframe.messageHandler.get(id)).toBe(undefined);
});