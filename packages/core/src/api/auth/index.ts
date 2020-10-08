import { BaseApi } from '../base-api';
import { invalidParameter, missingParameter, queryBuilder, SdkConfiguration } from '../..';
import { RequestType, ReturnType } from 'iceteaid-type';

export class AuthApi extends BaseApi {
    public sendOtp(emailOrPhone: string, channel: string): ReturnType<any> {
        if (!emailOrPhone) {
            throw missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            throw missingParameter('CHANNEL');
        }
        const payload = queryBuilder(RequestType.SEND_OTP, { emailOrPhone, channel });
        return this.transporter.post(this.iframe, payload);
    }

    public verifyOtp(emailOrPhone: string, channel: string, verifyCode: string): ReturnType<any> {
        if (!emailOrPhone) {
            throw missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            throw missingParameter('CHANNEL');
        }
        const payload = queryBuilder(RequestType.VERIFY_OTP, { emailOrPhone, channel, verifyCode });
        return this.transporter.post(this.iframe, payload);
    }

    public loginWithGoogle(redirectUri?: string): Promise<any>;
    public loginWithGoogle(redirectUri: string): ReturnType<any> | void {
        if (SdkConfiguration.target === 'react-native' && redirectUri) {
            throw invalidParameter('REDIRECT_URI');
        }
        if (SdkConfiguration.target === 'react-native' && !redirectUri) {
            const payload = queryBuilder(RequestType.LOGIN_WITH_GOOGLE, {});
            return this.transporter.post(this.iframe, payload);
        }
        if (!redirectUri) {
            throw missingParameter('REDIRECT_URI');
        }
        window.location.href = `http://3k1.theydont.work/account/google?sdkId=${this.iceteaId.sdkId}&redirectUri=${redirectUri}`;
    }

    public logout(): ReturnType<any> {
        const payload = queryBuilder(RequestType.LOG_OUT, {});
        return this.transporter.post(this.iframe, payload);
    }
}