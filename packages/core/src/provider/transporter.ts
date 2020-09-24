import { lastValueFrom } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { queryBuilder, subjectBuilder } from '../helpers';
import { RequestType } from 'iceteaid-type';
import { Iframe } from './iframe';

export abstract class Transporter<View extends Iframe = Iframe> {
    constructor(
        protected endpoint: string,
        protected iframe: View
    ) {
        this.boostrap();
    }

    protected abstract boostrap () : void
    public async post(requestType: RequestType, payload: Record<string, any>): Promise<any> {
        await this.iframe.isReady();
        const { id, subject } = subjectBuilder(this.iframe.messageHandler);
        this.iframe.postMessage(queryBuilder(id, requestType, payload));
        return await lastValueFrom(subject.asObservable().pipe(
            filter(message => !!message),
            take(1),
            tap(() => {
                this.iframe.messageHandler.delete(id);
            })
        ));
    }
}
