import { lastValueFrom } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { queryBuilder, randomId } from '../helpers';
import { RequestType } from 'iceteaid-type';
import { Iframe } from './iframe';
import { BehaviorSubject } from 'rxjs';

export abstract class Transporter {
    constructor(
        protected endpoint: string
    ) {
        this.boostrap();
    }

    protected abstract boostrap () : void
    public async post(iframe: Iframe, requestType: RequestType, payload: Record<string, any>): Promise<any> {
        const idMessage = randomId();
        const subject = new BehaviorSubject('');
        iframe.messageHandler.set(idMessage, subject);
        iframe.postMessage(queryBuilder(idMessage, requestType, payload));
        return await lastValueFrom(subject.asObservable().pipe(
            filter(message => !!message),
            take(1),
            tap(() => {
                iframe.messageHandler.delete(idMessage);
            })
        ));


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
