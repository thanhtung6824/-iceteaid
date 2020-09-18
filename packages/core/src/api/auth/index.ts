import { BaseApi } from '../base-api';
import { RequestType } from 'iceteaid-type';

export class AuthApi extends BaseApi {
    public registerWithOtp(emailOrPhone: string, channel: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.SEND_OTP_REGISTER, { emailOrPhone, channel });
    }

    public verifyOtpRegister(emailOrPhone: string, channel: string, verifyCode: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.VERIFY_OTP_REGISTER, { emailOrPhone, channel, verifyCode });
    }

    public loginWithOtp(emailOrPhone: string, channel: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.SEND_OTP_LOGIN, { emailOrPhone, channel });
    }

    public verifyOtpLogin(emailOrPhone: string, channel: string, verifyCode: string): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.VERIFY_OTP_LOGIN, { emailOrPhone, channel, verifyCode });
    }

    public loginWithGoogle(): Promise<any> {
        return this.transporter.post(this.iframe, RequestType.LOGIN_WITH_GOOGLE, {});
    }
}