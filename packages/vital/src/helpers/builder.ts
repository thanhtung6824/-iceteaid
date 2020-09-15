import { RequestType } from '@iceteaid/types';

// export function urlBuilder(url: string, baseUrl?: string): URL {
//     return baseUrl ? new URL(url, baseUrl) : new URL(url);
// }

export function randomId (): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function queryBuilder(idMessage: string, requestType: RequestType, payload: any) : string {
    return JSON.stringify({ payload, id: idMessage, requestType  });
}