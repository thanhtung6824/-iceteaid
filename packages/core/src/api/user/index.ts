import { BaseApi } from '../base-api';
import { RequestType } from 'iceteaid-type';

export class UserApi extends BaseApi {
    public generateEncryptionKey(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.GENERATE_ENCRYPTION_KEY, {});
    }

    public encryptKey(privateKey: string, encryptionKey: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.ENCRYPT_KEY, { privateKey, encryptionKey });
    }

    public decryptKey(privateKey: string, encryptionKey: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.DECRYPT_KEY, { privateKey, encryptionKey });
    }

    public getKey(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.GET_KEY, {});
    }

    public updateInfo(displayName: string, fullName: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.UPDATE_INFO, { displayName, fullName });
    }

    public getMetaData(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.GET_META_DATA, {});
    }

}