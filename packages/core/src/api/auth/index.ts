import { BaseApi } from '../base-api';
import { RequestType } from 'iceteaid-type';

export class AuthApi extends BaseApi {
    public sendOtp(emailOrPhone: string, channel: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.SEND_OTP, { emailOrPhone, channel });
    }

    public verifyOtp(emailOrPhone: string, channel: string, verifyCode: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.VERIFY_OTP, { emailOrPhone, channel, verifyCode });
    }
    public loginWithGoogle(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.LOGIN_WITH_GOOGLE, {});
    }
}