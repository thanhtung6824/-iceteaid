import { RequestType } from 'iceteaid-type';
import { BehaviorSubject, Subject } from 'rxjs';

// export function urlBuilder(url: string, baseUrl?: string): URL {
//     return baseUrl ? new URL(url, baseUrl) : new URL(url);
// }

export function randomId (): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
}

export function queryBuilder(idMessage: string, requestType: RequestType, payload: Record<string, any>) : string {
    return JSON.stringify({ payload, id: idMessage, requestType  });
}

export function subjectBuilder(messageHandler: Map<string, Subject<any>>): {id: string, subject: BehaviorSubject<any>} {
    const id = randomId();
    const subject = new BehaviorSubject<any>('');
    messageHandler.set(id, subject);
    return { id, subject };
}