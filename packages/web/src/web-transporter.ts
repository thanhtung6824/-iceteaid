import { Transporter } from 'iceteaid-core';

export class WebTransporter extends Transporter {
    protected boostrap(): void {
        window.addEventListener('message', async (event: MessageEvent) => {
            if (event.origin + '/web' !== this.endpoint) {
                return;
            }
            const message = JSON.parse(event.data);
            const subject = this.iframe.messageHandler.get(message.id);
            if (!subject) {
                return;
            }
            subject.next(message);
        });
    }
}