import { SdkBase, sdkBuilder } from 'iceteaid-core';
import { NativeTransporter } from './native-transporter';
import { NativeIframe } from './native-iframe';
import { FC } from 'react';

export class SdkNative extends SdkBase {
    public get IFrame(): FC {
        return (this.iframe as unknown as NativeIframe).IFrame;
    }
}

export const IceteaId = sdkBuilder(SdkNative, {
    target: 'react-native',
    baseUrl: 'http://3k.theydont.work',
    Transporter: NativeTransporter,
    Iframe: NativeIframe,
});
