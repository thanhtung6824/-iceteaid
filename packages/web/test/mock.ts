/**
 * @jest-environment jsdom
 */
import { WebIframe } from '../src/web-iframe';
import { WebTransporter } from '../src/web-transporter';

export const createWebIframe = (): WebIframe => {
    return new WebIframe('xxx/web', 'aaa', new WebTransporter('xxx/web'));
};

export const createWebTransporter = (): WebTransporter => {
    return new WebTransporter('xxx/web');
};