import { Transporter } from 'iceteaid-vital';

export class NativeTransporter extends Transporter {
    protected boostrap(): void {
        console.log('boostrap ...');
    }
}