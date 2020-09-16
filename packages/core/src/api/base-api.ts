import { Iframe, SdkBase, Transporter } from '..';

export abstract class BaseApi {
    constructor(protected readonly iceteaId: SdkBase) {
    }

    protected get iframe(): Iframe {
        return this.iceteaId.iframe;
    }

    protected get transporter(): Transporter {
        return this.iceteaId.transporter;
    }

}