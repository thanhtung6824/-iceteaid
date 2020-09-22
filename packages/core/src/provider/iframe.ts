import { Subject } from 'rxjs';

export abstract class Iframe {
    protected abstract openIframe(): void

    protected abstract closeIframe(): void

    public abstract postMessage(payload: string): void

    constructor(protected endpoint: string, protected sdkId: string) {
    }

    public abstract messageHandler: Map<string, Subject<any>>;
}