/**
 * @jest-environment jsdom
 */
import { AuthApi } from '../../../src/api/auth';
import { TestSdk } from '../../mocks';
import { SdkConfiguration } from '../../../src';

describe('SendOtp run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new AuthApi(testSdk) as any;

    it ('Work when pass parameter', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.sendOtp('abc', 'def');
        expect(mockPost).toBeCalledTimes(1);
    });

    it ('Throw error when not pass parameter', () => {
        try {
            testApi.sendOtp();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter EMAIL_OR_PHONE is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when pass emailOrPhone and not pass channel', () => {
        try {
            testApi.sendOtp('abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter CHANNEL is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when not pass emailOrPhone and pass channel', () => {
        try {
            testApi.sendOtp('', 'abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter EMAIL_OR_PHONE is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

});

describe('VerifyOtp run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new AuthApi(testSdk) as any;

    it ('Work when pass parameter', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.verifyOtp('abc', 'def');
        expect(mockPost).toBeCalledTimes(1);
    });

    it ('Throw error when not pass parameter', () => {
        try {
            testApi.verifyOtp();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter EMAIL_OR_PHONE is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when pass emailOrPhone and not pass channel', () => {
        try {
            testApi.verifyOtp('abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter CHANNEL is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when not pass emailOrPhone and pass channel', () => {
        try {
            testApi.verifyOtp('', 'abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter EMAIL_OR_PHONE is required');
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Login with google run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new AuthApi(testSdk) as any;
    it ('Work when target is react-native', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;

        SdkConfiguration.target = 'react-native';
        testApi.loginWithGoogle();
        expect(mockPost).toBeCalledTimes(1);
    });

    it ('Throw error when target is react-native and have redirect url', () => {
        try {
            SdkConfiguration.target = 'react-native';
            testApi.loginWithGoogle('redirect');
            expect(true).toBe(false);

        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [INVALID_PARAMETER] Parameter REDIRECT_URI is invalid');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Redirect when target is web', () => {
        SdkConfiguration.target = 'web';
        const sdkId = btoa(JSON.stringify({
            apiKey: 'xxx',
            target: 'web',
            baseUrl: 'http://3k.theydont.work'
        }));
        const url = `http://3k1.theydont.work/account/google?sdkId=${sdkId}&redirectUri=redirect`;
        Object.defineProperty(window, 'location', {
            value: new URL(url)
        } );
        testApi.loginWithGoogle('redirect');
        expect(window.location.href).toEqual(url);
    });

    it ('Throw error when target is web and dont have redirect url', () => {
        try {
            SdkConfiguration.target = 'web';
            testApi.loginWithGoogle();
            expect(true).toBe(false);

        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter REDIRECT_URI is required');
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Logout run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new AuthApi(testSdk) as any;

    it('Worked', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.logout();
        expect(mockPost).toBeCalledTimes(1);
    });
});