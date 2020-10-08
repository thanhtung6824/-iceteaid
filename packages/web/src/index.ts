import { sdkBuilder, SdkBase } from 'iceteaid-core';
import { WebIframe } from './web-iframe';
import { WebTransporter } from './web-transporter';

export const IceteaId = sdkBuilder(SdkBase, {
    target: 'web',
    baseUrl: 'http://3k.theydont.work/web',
    Transporter: WebTransporter,
    Iframe: WebIframe,
});