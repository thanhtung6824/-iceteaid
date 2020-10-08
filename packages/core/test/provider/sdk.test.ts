/**
 * @jest-environment jsdom
 */
import { TestSdk } from '../mocks';
import { UserApi } from '../../src/api/user';
import { AuthApi } from '../../src/api/auth';
import { TestIframe, TestTransporter } from '../mocks';

describe('Initialize IceteaId', () => {
    it ('Get instance will return instance if it set', () => {
        expect((TestSdk as any).instance).not.toBeDefined();
        const testSdk = (TestSdk as any).getInstance('xxx');
        expect(testSdk).toBeInstanceOf(TestSdk);
        expect((TestSdk as any).instance).toBeInstanceOf(TestSdk);
    });

    it ('Initialize correctly', () => {
        const testSdk = new TestSdk('xxx');
        const expectedSdkId = {
            apiKey: 'xxx',
            target: 'web',
            baseUrl: 'http://3k.theydont.work',
        };
        expect(JSON.stringify(expectedSdkId)).toBe(atob(testSdk.sdkId));
        expect(testSdk.user).toBeInstanceOf(UserApi);
        expect(testSdk.auth).toBeInstanceOf(AuthApi);
        expect((TestSdk as any).getInstance('xxx')).toBeInstanceOf(TestSdk);
        expect(testSdk.iframe).toBeInstanceOf(TestIframe);
        expect(testSdk.transporter).toBeInstanceOf(TestTransporter);
    });


    it('Initialize without apikey will throw err', () => {
        try {
            new TestSdk();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_API_KEY] You must provide a api key');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it('Is same instance between each call', () => {
        const testSdk = new TestSdk('xxx');
        const testSdk2 = new TestSdk('aaa');
        const testSdk3 = new TestSdk('xxx');

        expect(testSdk.iframe).toBe(testSdk3.iframe);
        expect(testSdk.iframe).not.toBe(testSdk2.iframe);

        expect(testSdk.transporter).toBe(testSdk3.transporter);
        expect(testSdk.transporter).not.toBe(testSdk2.transporter);
    });
});

