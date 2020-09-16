import { missingApiKeyError } from './exception-handler';
import { UserApi } from '../api/user';
import { Iframe } from './iframe';
import { Transporter } from './transporter';
import { AuthApi } from '../api/auth';

export class SdkBase {
    private _transport: Transporter | undefined;
    private _iframe: Iframe | undefined;

    private readonly sdkId: string;
    public readonly endpoint: string;
    public readonly user: UserApi;
    public readonly auth: AuthApi;

    constructor(apiKey: string) {
        if (!apiKey) {
            throw missingApiKeyError();
        }
        this.endpoint = SdkConfiguration.baseUrl;
        this.user = new UserApi(this);
        this.auth = new AuthApi(this);
        this.sdkId = btoa(JSON.stringify({
            apiKey: apiKey,
            target: SdkConfiguration.target,
            baseUrl: SdkConfiguration.baseUrl,
        }));
    }

    public get transporter(): Transporter {
        if (!this._transport) {
            this._transport = new SdkConfiguration.Transporter(this.endpoint);
        }

        return this._transport;
    }

    public get iframe(): Iframe {
        if (!this._iframe) {
            this._iframe = new SdkConfiguration.Iframe(this.endpoint, this.sdkId);
        }
        return this._iframe;
    }
}
type ConstructorOf<C> = { new (...args: any[]): C };

interface SdkConfiguration {
    target: 'web' | 'react-native';
    baseUrl: string;
    Transporter: ConstructorOf<Transporter>,
    Iframe: ConstructorOf<Iframe>,
}

export const SdkConfiguration: SdkConfiguration = {} as SdkConfiguration;

export function sdkBuilder<Sdk extends SdkBase>(
    IceteaIdInstance: Sdk,
    configuration: SdkConfiguration,
): Sdk {
    Object.assign(SdkConfiguration, configuration);
    return IceteaIdInstance;
}
