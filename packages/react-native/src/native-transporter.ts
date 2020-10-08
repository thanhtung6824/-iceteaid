import { Transporter } from 'iceteaid-core';

export class NativeTransporter extends Transporter {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    protected bootstrap(): void {
    }

    public handleMessage(event: Record<string, any>): void {
        const url = new URL(event.nativeEvent.url);
        if (
            event.nativeEvent &&
            url.origin === this.endpoint &&
            typeof event.nativeEvent.data === 'string'
        ) {
            this.on(event.nativeEvent.data);
        }
    }
}