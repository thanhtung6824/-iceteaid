import { SdkBase, sdkBuilder } from 'iceteaid-core';
import { NativeTransporter } from './native-transporter';
import { NativeIframe } from './native-iframe';
import React from 'react';
import { Buffer } from 'buffer';

global.Buffer = Buffer;
global.btoa = (str) => Buffer.from(str, 'binary').toString('base64');
global.atob = (b64Encoded) => Buffer.from(b64Encoded, 'base64').toString('binary');

export class SdkNative extends SdkBase {
    public get IFrame(): React.FC {
        return (this.iframe as unknown as NativeIframe).IFrame;
    }
}

export const IceteaId = sdkBuilder(SdkNative, {
    target: 'react-native',
    baseUrl: 'http://3k.theydont.work',
    Transporter: NativeTransporter,
    Iframe: NativeIframe,
});
