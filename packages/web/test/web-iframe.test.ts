/**
 * @jest-environment jsdom
 */
import { createWebIframe } from './mock';

beforeEach(() => {
    const iframe = document.getElementById('aaa');
    if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
    }
});

it('Create Iframe correctly', async () => {
    const iceteaId = await createWebIframe();
    const iframe = (iceteaId as any).iframe;

    expect(iframe.id).toEqual('aaa');
    expect(iframe.getAttribute('src')).toEqual('xxx/web');
    expect(iframe.style.width).toEqual('640px');
    expect(iframe.style.height).toEqual('480px');
    expect(iframe.style.display).toEqual('none');
});

it ('Throw error if open, close iframe not ready', async () => {
    const iceteaId = await createWebIframe();
    const iframe = document.getElementById('aaa');
    if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
    }
    try {
        (iceteaId as any).openIframe();
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('IceteaID Error: [VIEW_NOT_READY] View is not ready');
    }

    try {
        (iceteaId as any).closeIframe();
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('IceteaID Error: [VIEW_NOT_READY] View is not ready');
    }
});

it ('Open, Close Iframe when click', async () => {
    const iceteaId = await createWebIframe();
    const iframe = (iceteaId as any).iframe;

    (iceteaId as any).openIframe();
    expect(iframe.style.display).toEqual('block');
    (iceteaId as any).closeIframe();
    expect(iframe.style.display).toEqual('none');
});

it('Is ready func worked', async () => {
    const iceteaId = await createWebIframe();
    const iframe = (iceteaId as any).iframe;
    const map = {} as any;
    iframe.addEventListener = jest.fn((event: string, cb: any) => {
        map[event] = cb;
    });
    iceteaId.isReady();
    map.load();
    expect((iceteaId as any).isIframeReady).toEqual(true);
});

it ('Is ready will resolve when iframe loaded', async () => {
    const iceteaId = await createWebIframe();
    (iceteaId as any).isIframeReady = true;
    await expect(iceteaId.isReady()).resolves.toBe(true);
});

it('Didnt post message when view is not ready', async () => {
    const iceteaId = await createWebIframe() as any;
    iceteaId.isReady = jest.fn(() => Promise.resolve());
    iceteaId.iframe = undefined;
    try {
        await iceteaId.postMessage(JSON.stringify({ id: 123, msg: 'Here is test' }));
        expect(true).toBe(false);
    } catch (err) {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe('IceteaID Error: [VIEW_NOT_READY] View is not ready');
    }
});

it ('Will post message with expected arguments', async () => {
    const iceteaId = await createWebIframe();
    iceteaId.isReady = jest.fn(() => Promise.resolve());
    const mockPostmessage = jest.fn();
    (iceteaId as any).iframe = { contentWindow: { postMessage: mockPostmessage } };
    await iceteaId.postMessage(JSON.stringify({ id: 123, msg: 'Here is test' }));

    expect(mockPostmessage).toBeCalledWith(JSON.stringify({ id: 123, msg: 'Here is test' }), 'xxx/web');
});