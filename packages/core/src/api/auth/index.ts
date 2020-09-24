import { BaseApi } from '../base-api';
import { missingParameter, invalidParameter } from '../..';
import { RequestType, ReturnType } from 'iceteaid-type';
import { SdkConfiguration } from '../..';

export class AuthApi extends BaseApi {
    public sendOtp(emailOrPhone: string, channel: string): ReturnType<any> {
        if (!emailOrPhone) {
            return missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            return missingParameter('CHANNEL');
        }
        return this.transporter.post(RequestType.SEND_OTP, { emailOrPhone, channel });
    }

    public verifyOtp(emailOrPhone: string, channel: string, verifyCode: string): ReturnType<any> {
        if (!emailOrPhone) {
            return missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            return missingParameter('CHANNEL');
        }

        return this.transporter.post(RequestType.VERIFY_OTP, { emailOrPhone, channel, verifyCode });
    }

    public loginWithGoogle(redirectUri?: string): Promise<any>;
    public loginWithGoogle(redirectUri: string): ReturnType<any> | void {
        if (SdkConfiguration.target === 'react-native' && redirectUri) {
            return invalidParameter('REDIRECT_URI');
        }
        if (!redirectUri) {
            return this.transporter.post(RequestType.LOGIN_WITH_GOOGLE, {});
        }
        window.location.href = `http://localhost:3001/account/google?sdkId=${this.iceteaId.sdkId}&redirectUri=${redirectUri}`;
        // window.location.href = `http://3k1.theydont.work/account/google?sdkId=${this.iceteaId.sdkId}&redirectUri=${redirectUri}`;
    }
}