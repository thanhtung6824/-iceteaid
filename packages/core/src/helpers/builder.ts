import { RequestType } from 'iceteaid-type';
import { BehaviorSubject, Subject } from 'rxjs';

// export function urlBuilder(url: string, baseUrl?: string): URL {
//     return baseUrl ? new URL(url, baseUrl) : new URL(url);
// }

export function randomId (): string {
    return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10);
}

export function queryBuilder(requestType: RequestType, payload: Record<string, any>) : any {
    return { payload, id: randomId(), requestType  };
}

export function subjectBuilder(id: string, messageHandler: Map<string, Subject<any>>): BehaviorSubject<any> {
    const subject = new BehaviorSubject<any>('');
    messageHandler.set(id, subject);
    return subject;
}