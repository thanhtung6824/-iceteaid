/**
 * @jest-environment jsdom
 */

import { createTestIframe, createTestTransporter } from '../mocks';
import { queryBuilder } from '../../src';
import { RequestType } from 'iceteaid-type';

const createResponse = (id: string) => {
    return {
        id,
        payload: { err: false, msg: 'Im a response' }
    };
};

it ('Will post message', async () => {
    const transporter = createTestTransporter();
    const iframe = createTestIframe();
    const payload = queryBuilder('TEST_REQUEST' as RequestType, { msg: 'Hey! Im test' });
    transporter.post(iframe, payload);
    await iframe.isReady();

    expect(iframe.postMessage).toBeCalledWith(JSON.stringify(payload));
});

it ('Throw message if have error', async () => {
    const transporter = createTestTransporter();
    const iframe = createTestIframe();
    const payload = queryBuilder('TEST_REQUEST' as RequestType, { msg: 'Hey! Im test' });
    const promise = transporter.post(iframe, payload);
    await iframe.isReady();
    transporter.on(JSON.stringify({ id: payload.id, payload: { err: true, msg: 'What! Error' } }));
    await expect(promise).rejects.toStrictEqual({ id: payload.id, payload: { err: true, msg: 'What! Error' } });
    expect(transporter.messageHandlers.get(payload.id)).toBe(undefined);
});
//
it ('Ignore message if difference id', async () => {
    const transporter = createTestTransporter();
    const iframe = createTestIframe();
    const payload = queryBuilder('TEST_REQUEST' as RequestType, { msg: 'Hey! Im test' });
    transporter.post(iframe, payload);
    await iframe.isReady();
    transporter.on(JSON.stringify(createResponse('abc')));
    expect(transporter.messageHandlers.keys().next().value).toEqual(payload.id);
    expect(transporter.messageHandlers.values().next().value._value).toEqual('');
});

it ('Will receive message', async () => {
    const transporter = createTestTransporter();
    const iframe = createTestIframe();
    const payload = queryBuilder('TEST_REQUEST' as RequestType, { msg: 'Hey! Im test' });
    const promise = transporter.post(iframe, payload);
    await iframe.isReady();
    transporter.on(JSON.stringify(createResponse(payload.id)));
    await expect(promise).resolves.toStrictEqual(createResponse(payload.id));
    expect(transporter.messageHandlers.get(payload.id)).toBe(undefined);
});
