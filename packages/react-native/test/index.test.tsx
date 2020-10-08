/**
 * @jest-environment jsdom
 */
import React from 'react';
import { createSdk, createNativeIframe } from './mocks';
import { render } from '@testing-library/react-native';

it('Match snapshot', () => {
    const iceteaId = createNativeIframe();
    const component = render(<iceteaId.IFrame />);
    expect(component.toJSON()).toMatchSnapshot();
});

it ('Get Iframe will be same with Sdk', () => {
    const { IceteaId } = createSdk();
    const iceteaId = new IceteaId('xxx');
    expect(iceteaId.IFrame).toStrictEqual((iceteaId.iframe as any).IFrame);
});

it ('Global variable were defined', () => {
    delete (global as any)['URL'];
    delete (global as any).URLSearchParams;
    delete (global as any).atob;
    delete (global as any).btoa;
    expect((global as any).URL).toEqual(undefined);
    expect((global as any).URLSearchParams).toEqual(undefined);
    expect((global as any).atob).toEqual(undefined);
    expect((global as any).btoa).toEqual(undefined);
    createSdk();
    expect((global as any).URL).toBeDefined();
    expect((global as any).URLSearchParams).toBeDefined();
    expect((global as any).atob).toBeDefined();
    expect((global as any).btoa).toBeDefined();
});
