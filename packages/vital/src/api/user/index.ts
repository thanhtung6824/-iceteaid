import { BaseApi } from '../base-api';
import { RequestType } from 'id-type';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

export class UserApi extends BaseApi {
    public generateEncryptionKey(): Observable<any> {
        return this.transporter.post(this.iframe, RequestType.GENERATE_ENCRYPTION_KEY, {})
            .pipe(
                mergeMap(observer => this.iceteaId.user.encryptKey('abc', observer.payload.encryptionKey))
            );
    }

    public encryptKey(privateKey: string, encryptionKey: string): Observable<any> {
        return this.transporter.post(this.iframe, RequestType.ENCRYPT_KEY, { privateKey, encryptionKey });
    }
}