import { ExceptionType } from 'iceteaid-type';

export class ExceptionHandler extends Error {
    constructor(code: ExceptionType, message: string) {
        super(`IceteaID Error: [${code}] ${message}`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExceptionHandler.prototype);
    }
}

export function missingApiKeyError(): ExceptionHandler {
    return new ExceptionHandler(
        ExceptionType.MISSING_API_KEY,
        'You must provide a api key'
    );
}