import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { queryBuilder, randomId } from '../helpers';
import { SdkConfiguration } from './sdk';
import { RequestType } from '@iceteaid/types';
import { Iframe } from './iframe';

export abstract class Transporter {
    constructor(
        protected endpoint: string
    ) {
        this.boostrap();
    }

    protected abstract boostrap () : void
    public post(iframe: Iframe, requestType: RequestType, payload: any): Observable<any> {
        const idMessage = randomId();
        iframe.postMessage(queryBuilder(idMessage, requestType, payload));
        if (SdkConfiguration.target === 'react-native') {
            return iframe.subject
                .asObservable();
        }

        return fromEvent(window, 'message').pipe(
            // @ts-ignore
            filter((messageEvent: MessageEvent) => {
                const messageData = JSON.parse(messageEvent.data);
                return messageData.id === idMessage;
            }),
            map((messageEvent: MessageEvent) => JSON.parse(messageEvent.data)),
        );
    }
}
