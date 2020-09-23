import { Transporter } from 'iceteaid-core';

export class WebTransporter extends Transporter {
    protected boostrap(): void {
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.origin + '/web' !== this.endpoint) {
                return;
            }
            console.log('event received 2', event);
        });
    }
}