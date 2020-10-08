import { Iframe, Transporter } from '../src';
import { Subject } from 'rxjs';
import sinon from 'sinon';
import { TEST_SDK_ID, BASE_URL } from './constants';
import { sdkBuilder } from '../src';
import { SdkBase } from '../src';

export class TestIframe extends Iframe {
    public messageHandler: Map<string, Subject<any>> = new Map();
    protected bootstrap = sinon.stub();
    protected closeIframe = sinon.stub();
    protected openIframe = sinon.stub();
    public isReady = sinon.stub();
    public postMessage = sinon.stub();
}

export class TestTransporter extends Transporter {
    protected bootstrap(): void {
        console.log('bootstrap test transporter');
    }

    public post = sinon.stub();
}

export const TestSdk = sdkBuilder(SdkBase, {
    target: 'react-native',
    Iframe: TestIframe,
    Transporter: TestTransporter,
    baseUrl: BASE_URL,
});