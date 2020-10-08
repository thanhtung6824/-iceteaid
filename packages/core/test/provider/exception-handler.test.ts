/**
 * @jest-environment jsdom
 */
import { ExceptionHandler } from '../../src';
import { ExceptionType } from 'iceteaid-type';

it ('To be instance of Error', () => {
    const testException = new ExceptionHandler('123' as ExceptionType, '345');
    expect(testException).toBeInstanceOf(Error);
    expect(testException.message).toBe('IceteaID Error: [123] 345');
});