import { Subject } from 'rxjs';

export abstract class Iframe {
    protected abstract openIframe(): void

    protected abstract closeIframe(): void

    public abstract postMessage(payload: string): void

    protected constructor(protected endpoint: string, protected sdkId: string) {
    }
    public abstract subject: Subject<any>;

    public abstract messageHandler: Map<string, Subject<any>>;
}