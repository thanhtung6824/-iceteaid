export class ExceptionHandler extends Error {
    constructor(code: any, message: string) {
        super(`IceteaID Error: [${code}] ${message}`);

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, ExceptionHandler.prototype);
    }
}

export function missingApiKeyError(): ExceptionHandler {
    return new ExceptionHandler(
        100,
        'You must provide a api key'
    );
}