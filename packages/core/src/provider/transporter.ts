import { lastValueFrom } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { queryBuilder, subjectBuilder } from '../helpers';
import { RequestType } from 'iceteaid-type';
import { Iframe } from './iframe';

export abstract class Transporter {
    constructor(
        protected endpoint: string
    ) {
        this.boostrap();
    }

    protected abstract boostrap () : void
    public async post(iframe: Iframe, requestType: RequestType, payload: Record<string, any>): Promise<any> {
        await iframe.isReady();
        const { id, subject } = subjectBuilder(iframe.messageHandler);
        iframe.postMessage(queryBuilder(id, requestType, payload));
        return await lastValueFrom(subject.asObservable().pipe(
            filter(message => !!message),
            take(1),
            tap(() => {
                iframe.messageHandler.delete(id);
            })
        ));
    }
}
