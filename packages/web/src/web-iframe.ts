import { Iframe, viewIsNotReady } from 'iceteaid-core';
import { WebTransporter } from './web-transporter';

const isIframeExist = (eleId: string) => {
    return !!document.getElementById(eleId);
};

export class WebIframe extends Iframe<WebTransporter> {
    private iframe!: HTMLIFrameElement;
    private isIframeReady = false;

    protected async bootstrap(): Promise<void> {
        this.iframe = await this.createIframe();
    }

    protected createIframe(): Promise<HTMLIFrameElement> {
        return new Promise((resolve) => {
            if (!isIframeExist(this.sdkId)) {
                const iframe = document.createElement('iframe');
                iframe.setAttribute('src', this.endpoint);
                iframe.setAttribute('id', this.sdkId);
                iframe.style.width = '640px';
                iframe.style.height = '480px';
                iframe.style.display = 'none';
                document.body.appendChild(iframe);
                resolve(iframe);
            }
        });
    }

    protected closeIframe(): void {
        const iframe = document.getElementById(this.sdkId);
        if (iframe) {
            iframe.style.display = 'none';
            return;
        }
        throw viewIsNotReady();
    }

    protected openIframe(): void {
        const iframe = document.getElementById(this.sdkId);
        if (iframe) {
            iframe.style.display = 'block';
            return;
        }
        throw viewIsNotReady();
    }

    public async postMessage(payload: string): Promise<void> {
        await this.isReady();
        if (this.iframe && this.iframe.contentWindow) {
            return this.iframe.contentWindow.postMessage(payload, this.endpoint);
        }
        throw viewIsNotReady();
    }

    public async isReady(): Promise<any> {
        if (!this.isIframeReady) {
            return new Promise((resolve) => {
                const iframe = document.getElementById(this.sdkId) as HTMLIFrameElement;
                iframe.addEventListener('load', () => {
                    this.isIframeReady = true;
                    resolve();
                });
            });
        }
        return Promise.resolve(true);
    }
}