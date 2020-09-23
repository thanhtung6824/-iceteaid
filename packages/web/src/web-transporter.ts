import { Transporter } from 'iceteaid-core';

export class WebTransporter extends Transporter {
    protected boostrap(): void {
        window.addEventListener('message', (event: MessageEvent) => {
            if (event.origin !== this.endpoint) {
                return;
            }
        });
    }
}