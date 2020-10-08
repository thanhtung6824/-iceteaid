/**
 * @jest-environment jsdom
 */
import { UserApi } from '../../../src/api/user';
import { TestSdk } from '../../mocks';

describe('Generate encryption key run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Run correctly', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.generateEncryptionKey();
        expect(mockPost).toBeCalledTimes(1);
    });
});

describe('Encrypt key run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Work when pass parameter', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.encryptKey('abc', 'def');
        expect(mockPost).toBeCalledTimes(1);
    });
    it ('Throw error when not pass parameter', () => {
        try {
            testApi.encryptKey('', '');
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter PRIVATE_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when pass private key but not encryption key', () => {
        try {
            testApi.encryptKey('abc', '');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter ENCRYPTION_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when not pass private key but pass encryption key', () => {
        try {
            testApi.encryptKey('', 'abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter PRIVATE_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Decrypt key run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Work when pass parameter', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.decryptKey('abc', 'def');
        expect(mockPost).toBeCalledTimes(1);
    });
    it ('Throw error when not pass parameter', () => {
        try {
            testApi.decryptKey('', '');
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter PRIVATE_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when pass private key but not encryption key', () => {
        try {
            testApi.decryptKey('abc', '');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter ENCRYPTION_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });

    it ('Throw error when not pass private key but pass encryption key', () => {
        try {
            testApi.decryptKey('', 'abc');
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter PRIVATE_KEY is required');
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Get key run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Run correctly', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.getKey();
        expect(mockPost).toBeCalledTimes(1);
    });
});

describe('Update Info run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Run correctly when pass at least parameter', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.updateInfo('', 'abc');
        expect(mockPost).toBeCalledTimes(1);
        testApi.updateInfo('abc', 'def');
        expect(mockPost).toBeCalledTimes(2);
        testApi.updateInfo('abc', '');
        expect(mockPost).toBeCalledTimes(3);
    });

    it ('Throw error when not pass parameter', () => {
        try {
            testApi.updateInfo();
            expect(true).toBe(false);
        } catch (err) {
            expect(err.message).toBe('IceteaID Error: [MISSING_PARAMETER] Parameter AT_LEAST_ONE_PARAMETER is required');
            expect(err).toBeInstanceOf(Error);
        }
    });
});

describe('Get metadata run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Run correctly', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.getMetaData();
        expect(mockPost).toBeCalledTimes(1);
    });
});

describe('Get data after redirect run correctly', () => {
    const testSdk = new TestSdk('xxx');
    const testApi = new UserApi(testSdk) as any;

    it ('Run correctly', () => {
        const mockPost = jest.fn();
        testApi.transporter.post = mockPost;
        testApi.getDataAfterRedirect();
        expect(mockPost).toBeCalledTimes(1);
    });
});
