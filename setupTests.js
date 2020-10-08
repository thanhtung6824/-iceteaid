import browserEnv from 'browser-env';

beforeEach(() => {
    jest.resetModules();
    browserEnv();
});
