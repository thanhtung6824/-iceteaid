import { BaseApi } from '../base-api';
import { missingParameter } from '../..';
import { RequestType, ReturnType } from 'iceteaid-type';

export class AuthApi extends BaseApi {
    public sendOtp(emailOrPhone: string, channel: string): ReturnType<any> {
        if (!emailOrPhone) {
            return missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            return missingParameter('CHANNEL');
        }
        return this.transporter.post(this.iframe, RequestType.SEND_OTP, { emailOrPhone, channel });
    }

    public verifyOtp(emailOrPhone: string, channel: string, verifyCode: string): ReturnType<any> {
        if (!emailOrPhone) {
            return missingParameter('EMAIL_OR_PHONE');
        }
        if (!channel) {
            return missingParameter('CHANNEL');
        }

        return this.transporter.post(this.iframe, RequestType.VERIFY_OTP, { emailOrPhone, channel, verifyCode });
    }

    public loginWithGoogle(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.LOGIN_WITH_GOOGLE, {});
    }
}