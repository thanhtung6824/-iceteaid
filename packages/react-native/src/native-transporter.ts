import { Transporter } from 'id-vital';

export class NativeTransporter extends Transporter {
    protected boostrap(): void {
        console.log('boostrap ...');
    }
}