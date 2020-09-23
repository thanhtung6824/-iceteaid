import { sdkBuilder, SdkBase } from 'iceteaid-core';
import { WebIframe } from './web-iframe';
import { WebTransporter } from './web-transporter';

export const IceteaId = sdkBuilder(SdkBase, {
    target: 'web',
    baseUrl: 'http://localhost:3000',
    Transporter: WebTransporter,
    Iframe: WebIframe,
});
