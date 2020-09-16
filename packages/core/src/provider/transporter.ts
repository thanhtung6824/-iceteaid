import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { queryBuilder, randomId } from '../helpers';
import { SdkConfiguration } from './sdk';
import { RequestType } from 'iceteaid-type';
import { Iframe } from './iframe';

export abstract class Transporter {
    protected constructor(
        protected endpoint: string
    ) {
        this.boostrap();
    }

    protected abstract boostrap () : void
    public post(iframe: Iframe, requestType: RequestType, payload: Record<string, any>): Observable<any> {
        const idMessage = randomId();
        iframe.postMessage(queryBuilder(idMessage, requestType, payload));
        console.log('SdkConfiguration', SdkConfiguration);
        return iframe.subject.asObservable();

        
        // if (SdkConfiguration.target === 'react-native') {
        //     return iframe.subject
        //         .asObservable();
        // }
        //
        // return fromEvent<MessageEvent<string>>(window, 'message').pipe(
        //     filter((messageEvent: MessageEvent<string>) => {
        //         const messageData = JSON.parse(messageEvent.data);
        //         return messageData.id === idMessage;
        //     }),
        //     map((messageEvent: MessageEvent<string>) => JSON.parse(messageEvent.data)),
        // );
    }
}
