import { RequestType } from 'id-type';

// export function urlBuilder(url: string, baseUrl?: string): URL {
//     return baseUrl ? new URL(url, baseUrl) : new URL(url);
// }

export function randomId (): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export function queryBuilder(idMessage: string, requestType: RequestType, payload: Record<string, any>) : string {
    return JSON.stringify({ payload, id: idMessage, requestType  });
}