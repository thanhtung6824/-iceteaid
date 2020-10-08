import { missingApiKeyError } from './exception-handler';
import { UserApi } from '../api/user';
import { Iframe } from './iframe';
import { Transporter } from './transporter';
import { AuthApi } from '../api/auth';

export class SdkBase {
    private static _transport: Map<string, Transporter> = new Map();
    private static _iframe: Map<string, Iframe> = new Map();

    public readonly sdkId: string;
    public readonly endpoint: string;
    public readonly user: UserApi;
    public readonly auth: AuthApi;
    private static instance: SdkBase;
    private readonly apiKey: string

    constructor(apiKey: string) {
        if (!apiKey) {
            throw missingApiKeyError();
        }
        this.apiKey = apiKey;
        this.endpoint = SdkConfiguration.baseUrl;
        this.user = new UserApi(this);
        this.auth = new AuthApi(this);
        this.sdkId = btoa(JSON.stringify({
            apiKey: apiKey,
            target: SdkConfiguration.target,
            baseUrl: SdkConfiguration.baseUrl,
            // origin: window.location.origin,
        }));
        SdkBase.instance = this;
    }

    public static getInstance(apiKey: string): SdkBase {
        if (!SdkBase.instance) {
            SdkBase.instance = new SdkBase(apiKey);
        }
        return SdkBase.instance;
    }

    public get transporter(): Transporter {
        if (!SdkBase._transport.has(this.sdkId)) {
            SdkBase._transport.set(
                this.sdkId,
                new SdkConfiguration.Transporter(this.endpoint)
            );
        }
        return <Transporter>SdkBase._transport.get(this.sdkId);
    }

    public get iframe(): Iframe {
        if (!SdkBase._iframe.has(this.sdkId)) {
            SdkBase._iframe.set(
                this.sdkId,
                new SdkConfiguration.Iframe(this.endpoint, this.sdkId, this.transporter)
            );
        }
        return <Iframe>SdkBase._iframe.get(this.sdkId);
    }
}
type ConstructorOf<C> = { new (...args: any[]): C };

interface SdkConfiguration {
    target: 'web' | 'react-native';
    baseUrl: string;
    Transporter: ConstructorOf<Transporter>,
    Iframe: ConstructorOf<Iframe>,
    Instance?: SdkBase | undefined,
}

export const SdkConfiguration: SdkConfiguration = {} as SdkConfiguration;

export function sdkBuilder<Sdk extends SdkBase>(
    IceteaSdk: ConstructorOf<Sdk>,
    configuration: SdkConfiguration,
): ConstructorOf<Sdk> {
    Object.assign(SdkConfiguration, configuration);
    return IceteaSdk;
}
