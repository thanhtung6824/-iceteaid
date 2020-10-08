import importFresh from 'import-fresh';
import { NativeIframe } from '../src/native-iframe';
import { NativeTransporter } from '../src/native-transporter';
import { BASE_URL, TEST_SDK_ID } from './constants';

export const createSdk = (): typeof import ('../src') => {
    return importFresh('../src/index.ts') as typeof import('../src/index');
};

export const createNativeIframe = (): NativeIframe => {
    return new NativeIframe(BASE_URL, TEST_SDK_ID, new NativeTransporter(BASE_URL));
};
