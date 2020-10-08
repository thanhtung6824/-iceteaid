import { Transporter } from 'iceteaid-core';

export class NativeTransporter extends Transporter {
    protected bootstrap(): void {
        console.log('bootstrap transporter');
    }
}