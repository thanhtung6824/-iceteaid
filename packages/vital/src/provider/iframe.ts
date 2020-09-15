import { Subject } from 'rxjs';

export abstract class Iframe {
    protected abstract openIframe(): void

    protected abstract closeIframe(): void

    public abstract postMessage(payload: any): void

    protected constructor(protected endpoint: string, protected sdkId: string) {
    }
    public abstract subject: Subject<any>;

}