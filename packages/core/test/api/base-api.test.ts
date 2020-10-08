/**
 * @jest-environment jsdom
 */
import { TestApi, TestSdk } from '../mocks';

it('Initialize', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new TestApi(testSdk) as any;

    expect(testApi.iframe).toEqual(testSdk.iframe);
    expect(testApi.transporter).toEqual(testSdk.transporter);
});