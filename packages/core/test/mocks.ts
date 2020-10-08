import { Iframe, Transporter } from '../src';
import { Subject } from 'rxjs';
import { BASE_URL } from './constants';
import { sdkBuilder } from '../src';
import { SdkBase } from '../src';
import { BaseApi } from '../src/api/base-api';

export class TestIframe extends Iframe {
    public bootstrap = jest.fn();
    protected closeIframe = jest.fn();
    protected openIframe = jest.fn();
    public isReady = jest.fn(() => Promise.resolve());
    public postMessage = jest.fn();
}

export class TestTransporter extends Transporter {
    public messageHandlers: Map<string, Subject<any>> = new Map();
    protected bootstrap = jest.fn()
}

export class TestApi extends BaseApi {
    
}

export const createTestTransporter = (): TestTransporter => {
    return new TestTransporter(BASE_URL);
};

export const createTestIframe = (): TestIframe => {
    return new TestIframe(BASE_URL, 'xxx', createTestTransporter());
};

export const createTestApi = (): TestApi => {
    return new TestApi(new TestSdk('xxx'));
};

export const TestSdk = sdkBuilder(SdkBase, {
    target: 'web',
    Iframe: TestIframe,
    Transporter: TestTransporter,
    baseUrl: BASE_URL,
});
