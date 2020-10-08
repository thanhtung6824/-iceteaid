import { Subject } from 'rxjs';

export abstract class Iframe {
    protected abstract openIframe(): void

    protected abstract closeIframe(): void

    public abstract postMessage(payload: string): void

    constructor(protected endpoint: string, protected sdkId: string) {
        if (this.bootstrap) this.bootstrap();
    }

    public abstract messageHandler: Map<string, Subject<any>>;

    public abstract isReady(): Promise<any>;

    protected abstract bootstrap(): void;
}