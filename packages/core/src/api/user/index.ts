import { BaseApi } from '../base-api';
import { RequestType } from 'iceteaid-type';

export class UserApi extends BaseApi {
    public generateEncryptionKey(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.GENERATE_ENCRYPTION_KEY, {});
    }

    public encryptKey(privateKey: string, encryptionKey: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.ENCRYPT_KEY, { privateKey, encryptionKey });
    }
}