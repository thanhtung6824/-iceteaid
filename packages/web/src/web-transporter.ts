import { Transporter } from 'iceteaid-core';

export class WebTransporter extends Transporter {
    protected bootstrap(): void {
        window.addEventListener('message', (event: MessageEvent) => {
            if (
                event.origin + '/web' === this.endpoint &&
                typeof event.data === 'string'
            ) {
                this.on(event.data);
            }
        });
    }
}