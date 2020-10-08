import { Transporter } from './transporter';

export abstract class Iframe<T extends Transporter = Transporter> {
    protected abstract openIframe(): void

    protected abstract closeIframe(): void

    public abstract postMessage(payload: string): void

    constructor(
        protected endpoint: string,
        protected sdkId: string,
        protected transporter: T
    ) {
        if (this.bootstrap) this.bootstrap();
    }

    public abstract isReady(): Promise<any>;

    protected abstract bootstrap(): void;
}