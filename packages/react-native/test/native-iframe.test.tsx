/**
 * @jest-environment jsdom
 */
import React from 'react';
import { createNativeIframe } from './mocks';
import { Platform } from 'react-native';
import { act, render } from '@testing-library/react-native';
import { randomId, subjectBuilder } from 'iceteaid-core';
import { BASE_URL } from './constants';
jest.useFakeTimers();

describe('Open, close Iframe', () => {
    it ('Iframe not open, close if view not set', () => {
        const iceteaId = createNativeIframe() as any;
        iceteaId.view = undefined;
        try {
            iceteaId.openIframe();
            expect(true).toBe(false);
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('IceteaID Error: [VIEW_NOT_READY] View is not ready');
        }
        try {
            iceteaId.closeIframe();
            expect(true).toBe(false);
        } catch (err) {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe('IceteaID Error: [VIEW_NOT_READY] View is not ready');
        }
    });
    it('Open, Close Iframe when click', async () => {
        const iceteaId = createNativeIframe();
        const { getByTestId } = render(<iceteaId.IFrame/>);
        const safeAreaView = getByTestId('qwerty');
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'zIndex',
            -10000,
        );
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'elevation',
            -10000,
        );
        act(() => {
            (iceteaId as any).openIframe();
        });
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'zIndex',
            10000,
        );
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'elevation',
            10000,
        );
        act(() => {
            (iceteaId as any).closeIframe();
        });
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'zIndex',
            -10000,
        );
        expect(safeAreaView.props.style[1]).toHaveProperty(
            'elevation',
            -10000,
        );
    });
});

describe('Postmessage', () => {
    it('Post message with given parameters', async () => {
        const iceteaId = createNativeIframe();
        iceteaId.isReady = jest.fn(() => Promise.resolve());
        const mockPostmessage = jest.fn();
        (iceteaId as any).iframe = { postMessage: mockPostmessage };
        await iceteaId.postMessage(JSON.stringify({ id: 123, msg: 'Here is test' }));

        expect(mockPostmessage).toBeCalledWith(JSON.stringify({ id: 123, msg: 'Here is test' }));
    });

    it('Post message login with google', async () => {
        const iceteaId = createNativeIframe();
        iceteaId.isReady = jest.fn(() => Promise.resolve());
        const mockPostmessage = jest.fn();
        const id = randomId();
        subjectBuilder(id, (iceteaId as any).transporter.messageHandlers);
        const mockOpenIframe = jest.fn();
        const mockCloseIframe = jest.fn();
        (iceteaId as any).iframe = {
            postMessage: mockPostmessage,
        };
        (iceteaId as any).view = {
            openIframe: mockOpenIframe,
            closeIframe: mockCloseIframe,
        };

        await iceteaId.postMessage(JSON.stringify({ id, requestType: 'LOGIN_WITH_GOOGLE', msg: 'Here is test' }));
        expect((iceteaId as any).googleLoginId).toEqual(id);
    });
});

describe('Onmessage', () => {
    it ('On message will be call', () => {
        const iceteaId = createNativeIframe();
        const mockOnmsg = jest.fn();
        (iceteaId as any).transporter.handleMessage = mockOnmsg;
        const { getByTestId } = render(<iceteaId.IFrame/>);
        const webview = getByTestId('abcxyz');
        webview.props.onMessage();
        expect(mockOnmsg).toBeCalledTimes(1);
    });

    it('On message ignore message from difference endpoint', () => {
        const iceteaId = createNativeIframe();
        const id = randomId();
        const subject = subjectBuilder(id, (iceteaId as any).transporter.messageHandlers);
        const event = {
            nativeEvent: {
                url: 'http://aaa.com',
                data: JSON.stringify({ id, msg: 'Here is data' })
            }
        };
        (iceteaId as any).transporter.handleMessage(event);
        expect(subject.getValue()).toEqual('');
    });

    it('On message ignore message from difference id', () => {
        const iceteaId = createNativeIframe();
        const id = randomId();
        const subject = subjectBuilder(id, (iceteaId as any).transporter.messageHandlers);
        const event = {
            nativeEvent: {
                url: 'http://aaa.com',
                data: JSON.stringify({ id: 123, msg: 'Here is data' })
            }
        };
        (iceteaId as any).transporter.handleMessage(event);
        expect(subject.getValue()).toEqual('');
    });


    it('On message will receive value', () => {
        const iceteaId = createNativeIframe();
        const id = randomId();
        const subject = subjectBuilder(id, (iceteaId as any).transporter.messageHandlers);
        const event = {
            nativeEvent: {
                url: BASE_URL,
                data: JSON.stringify({ id, msg: 'Here is data' })
            }
        };
        (iceteaId as any).transporter.handleMessage(event);
        expect(subject.getValue()).toStrictEqual({ id, msg: 'Here is data' });
    });
});

describe('Webview navigation', () => {
    it ('Handle Webview navigation be call', () => {
        const iceteaId = createNativeIframe();
        const mockHandleState = jest.fn();
        iceteaId.handleWebViewNavigationStateChangeWrapper = mockHandleState;
        const { getByTestId } = render(<iceteaId.IFrame/>);
        const webview = getByTestId('abcxyz');
        webview.props.onNavigationStateChange();
        expect(mockHandleState).toBeCalledTimes(1);
    });

    it('Handle Webview navigation', async () => {
        const iceteaId = createNativeIframe();
        iceteaId.isReady = jest.fn(() => Promise.resolve());
        const id = randomId();
        const subject = subjectBuilder(id, (iceteaId as any).transporter.messageHandlers);
        const mockPostmessage = jest.fn();
        const mockOpenIframe = jest.fn();
        const mockCloseIframe = jest.fn();
        (iceteaId as any).iframe = {
            postMessage: mockPostmessage,
        };
        (iceteaId as any).view = {
            openIframe: mockOpenIframe,
            closeIframe: mockCloseIframe,
        };

        await iceteaId.postMessage(JSON.stringify({ id, requestType: 'LOGIN_WITH_GOOGLE', msg: 'Here is test' }));
        const newNavstate = {
            url: `http:/testthuima?token=${JSON.stringify({ access_token: 'tokenne' })}&existUser=true`,
            canGoForward: false
        };
        iceteaId.handleWebViewNavigationStateChangeWrapper(newNavstate);
        expect(subject.getValue()).toStrictEqual({ id, payload: {
            existUser: 'true',
            token: 'tokenne'
        } });
        expect((iceteaId as any).googleLoginId).toEqual('');
    });
});
//
describe ('Is ready resolve promise when iframe ready',  () => {
    it ('It will post message', () => {
        const iceteaId = createNativeIframe();
        const mockPostmessage = jest.fn();
        (iceteaId as any).iframe = {
            postMessage: mockPostmessage,
        };
        iceteaId.isReady();
        jest.advanceTimersByTime(1000);
        expect(mockPostmessage).toBeCalledTimes(1);
    });
    it ('It will resolve value and clear subject', async () => {
        const iceteaId = createNativeIframe() as any;
        const mockPostmessage = jest.fn();
        iceteaId.iframe = {
            postMessage: mockPostmessage,
        };
        const isOkay = iceteaId.isReady();
        jest.advanceTimersByTime(1000);
        const idSubject = iceteaId.transporter.messageHandlers.keys().next().value;
        iceteaId.transporter.on(JSON.stringify({ id: idSubject, payload: { msg: 'Hey! Im okay' } }));
        await expect(isOkay).resolves.toStrictEqual({ id: idSubject, payload: { msg: 'Hey! Im okay' } });
        const clearSubject = iceteaId.transporter.messageHandlers.get(idSubject);
        expect(clearSubject).not.toBeDefined();
        expect(clearInterval).toBeCalled();
    });
});

describe('Webview agent', () => {
    it('Correct agent when os is Android', () => {
        Platform.OS = 'android';
        const iceteaId = createNativeIframe();
        const { getByTestId } = render(<iceteaId.IFrame/>);
        const webview = getByTestId('abcxyz');
        expect(webview.props.userAgent).toBe('Mozilla/5.0 (Linux; Android 4.1.1; Galaxy Nexus Build/JRO03C) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Mobile Safari/535.19');
    });

    it('Correct agent when os is Ios', () => {
        Platform.OS = 'ios';
        const iceteaId = createNativeIframe();
        const { getByTestId } = render(<iceteaId.IFrame/>);
        const webview = getByTestId('abcxyz');
        expect(webview.props.userAgent).toBe('Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/603.1.23 (KHTML, like Gecko) Version/10.0 Mobile/14E5239e Safari/602');
    });
});