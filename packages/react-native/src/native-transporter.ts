import { Transporter } from 'iceteaid-core';

export class NativeTransporter extends Transporter {
    protected boostrap(): void {
        console.log('boostrap application ...n...');
    }
}