/**
 * @jest-environment jsdom
 */
import { createTestIframe } from '../mocks';
import { Iframe } from '../../src';

it ('Will call boostrap when init', () => {
    const mockBootstrap = jest.fn();
    (Iframe.prototype as any).bootstrap = mockBootstrap;

    createTestIframe();
    expect(mockBootstrap).toBeCalled();
});