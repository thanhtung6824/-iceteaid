import { BaseApi } from '../base-api';
import { RequestType, ReturnType } from 'iceteaid-type';
import { missingParameter, queryBuilder } from '../..';

export class UserApi extends BaseApi {
    public generateEncryptionKey(): ReturnType<any> {
        const payload = queryBuilder(RequestType.GENERATE_ENCRYPTION_KEY, {});
        return this.transporter.post(this.iframe, payload);
    }

    public encryptKey(privateKey: string, encryptionKey: string, mnemonic?: string): ReturnType<any> {
        if (!privateKey) {
            throw missingParameter('PRIVATE_KEY');
        }
        if (!encryptionKey) {
            throw missingParameter('ENCRYPTION_KEY');
        }
        const payload = queryBuilder(RequestType.ENCRYPT_KEY, { privateKey, encryptionKey, mnemonic: mnemonic || '' });
        return this.transporter.post(this.iframe, payload);
    }

    public decryptKey(privateKey: string, encryptionKey: string, mnemonic?: string): ReturnType<any> {
        if (!privateKey) {
            throw missingParameter('PRIVATE_KEY');
        }
        if (!encryptionKey) {
            throw missingParameter('ENCRYPTION_KEY');
        }
        const payload = queryBuilder(RequestType.DECRYPT_KEY, { privateKey, encryptionKey, mnemonic: mnemonic || '' });
        return this.transporter.post(this.iframe, payload);
    }

    public getKey(): ReturnType<any> {
        const payload = queryBuilder(RequestType.GET_KEY, {});
        return this.transporter.post(this.iframe, payload);
    }

    public updateInfo(displayName?: string, fullName?: string): ReturnType<any> {
        if (!displayName && !fullName) {
            throw missingParameter('AT_LEAST_ONE_PARAMETER');
        }
        const payload = queryBuilder(RequestType.UPDATE_INFO, { displayName, fullName });
        return this.transporter.post(this.iframe, payload);
    }

    public getMetaData(): ReturnType<any> {
        const payload = queryBuilder(RequestType.GET_META_DATA, {});
        return this.transporter.post(this.iframe, payload);
    }

    public getDataAfterRedirect(): ReturnType<any> {
        const payload = queryBuilder(RequestType.WEB_GET_DATA_AFTER_REDIRECT, {});
        return this.transporter.post(this.iframe, payload);
    }
}