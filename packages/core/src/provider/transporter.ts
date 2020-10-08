import { lastValueFrom, throwError } from 'rxjs';
import { filter, map, take, tap } from 'rxjs/operators';
import { subjectBuilder } from '../helpers';
import { Iframe } from './iframe';

export abstract class Transporter {
    constructor(
        protected endpoint: string,
    ) {
        if (this.bootstrap) this.bootstrap();
    }
    public messageHandlers = new Map<string, any>();

    protected abstract bootstrap(): void

    public async post(iframe: Iframe, payload: Record<string, any>): Promise<any> {
        await iframe.isReady();
        const id = payload.id;
        const subject = subjectBuilder(id, this.messageHandlers);
        iframe.postMessage(JSON.stringify(payload));
        return lastValueFrom(subject.asObservable().pipe(
            filter(message => !!message),
            map(message => {
                if (message.payload && message.payload.err) {
                    return lastValueFrom(throwError(message));
                }
                return message;
            }),
            take(1),
            tap(() => {
                this.messageHandlers.delete(id);
            })
        ));
    }

    public on(payload: string): void {
        const message = JSON.parse(payload);
        const subject = this.messageHandlers.get(message.id);
        if (subject) {
            subject.next(message);
        }
    }
}