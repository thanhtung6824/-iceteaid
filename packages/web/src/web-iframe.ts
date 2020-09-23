import { Iframe } from 'iceteaid-core';

const isIframeExist = (eleId: string) => {
    return !!document.getElementById(eleId);
};

export class WebIframe extends Iframe {
    private iframe: Promise<HTMLIFrameElement> | null = null;
    public messageHandler = new Map<string, any>();

    protected bootstrap(): void {
        this.iframe = this.createIframe();
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
                iframe.onload = () => {
                    iframe.style.display = 'block';
                    resolve(iframe);
                };
            }
        });
    }

    protected closeIframe(): void {
        const iframe = document.getElementById(this.sdkId);
        if (iframe) iframe.style.display = 'none';
    }

    protected openIframe(): void {
        const iframe = document.getElementById(this.sdkId);
        if (iframe) iframe.style.display = 'block';
    }

    public async postMessage(payload: string): Promise<void> {
        const iframe = await this.iframe;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.postMessage(payload, this.endpoint);
        }
    }

    public async isReady(): Promise<any> {
        await this.iframe;
        return Promise.resolve();
    }
}