import { BaseApi } from '../base-api';
import { RequestType, ReturnType } from 'iceteaid-type';
import { missingParameter } from '../..';

export class UserApi extends BaseApi {
    public generateEncryptionKey(): ReturnType<any> {
        return this.transporter.post(RequestType.GENERATE_ENCRYPTION_KEY, {});
    }

    public encryptKey(privateKey: string, encryptionKey: string): ReturnType<any> {
        if (!privateKey) {
            return missingParameter('PRIVATE_KEY');
        }
        if (!encryptionKey) {
            return missingParameter('ENCRYPTION_KEY');
        }
        return this.transporter.post(RequestType.ENCRYPT_KEY, { privateKey, encryptionKey });
    }

    public decryptKey(privateKey: string, encryptionKey: string): ReturnType<any> {
        if (!privateKey) {
            return missingParameter('PRIVATE_KEY');
        }
        if (!encryptionKey) {
            return missingParameter('ENCRYPTION_KEY');
        }
        return this.transporter.post(RequestType.DECRYPT_KEY, { privateKey, encryptionKey });
    }

    public getKey(): ReturnType<any> {
        return this.transporter.post(RequestType.GET_KEY, {});
    }

    public updateInfo(displayName: string, fullName: string): ReturnType<any> {
        return this.transporter.post(RequestType.UPDATE_INFO, { displayName, fullName });
    }

    public getMetaData(): ReturnType<any> {
        return this.transporter.post(RequestType.GET_META_DATA, {});
    }

    public getDataAfterRedirect(): ReturnType<any> {
        return this.transporter.post(RequestType.WEB_GET_DATA_AFTER_REDIRECT, {});
    }
}