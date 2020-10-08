/**
 * @jest-environment jsdom
 */
import { createWebTransporter } from './mock';
import { randomId, subjectBuilder } from 'iceteaid-core';

beforeEach(() => {
    const iframe = document.getElementById('aaa');
    if (iframe && iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
    }
});

it ('Will listener event message', async () => {
    const transporter = createWebTransporter();
    const map = {} as any;
    window.addEventListener = jest.fn((event: string, cb: any) => {
        map[event] = cb;
    });
    (transporter as any).bootstrap();
    expect(map.message).toBeDefined();
});

it ('Will ignore message from difference endpoint', async () => {
    const transporter = createWebTransporter();
    const id = randomId();
    const subject = subjectBuilder(id, transporter.messageHandlers);
    const map = {} as any;
    window.addEventListener = jest.fn((event: string, cb: any) => {
        map[event] = cb;
    });
    (transporter as any).bootstrap();
    const event = {
        origin: 'aha',
        data: JSON.stringify({ id, msg: 'Hey! Im test' })
    };
    map.message(event);
    expect(subject.getValue()).toEqual('');
});

it ('Will ignore message if difference id', async () => {
    const transporter = createWebTransporter();
    const id = randomId();
    const subject = subjectBuilder(id, transporter.messageHandlers);
    const map = {} as any;
    window.addEventListener = jest.fn((event: string, cb: any) => {
        map[event] = cb;
    });
    (transporter as any).bootstrap();
    const event = {
        origin: 'xxx',
        data: JSON.stringify({ id: 123, msg: 'Hey! Im test' })
    };
    map.message(event);
    expect(subject.getValue()).toEqual('');
});

it('Will received message', async () => {
    const transporter = createWebTransporter();
    const id = randomId();
    const subject = subjectBuilder(id, transporter.messageHandlers);

    const map = {} as any;
    window.addEventListener = jest.fn((event: string, cb: any) => {
        map[event] = cb;
    });
    (transporter as any).bootstrap();
    const event = {
        origin: 'xxx',
        data: JSON.stringify({ id, msg: 'Hey! Im test' })
    };
    map.message(event);
    expect(subject.getValue()).toStrictEqual({ id, msg: 'Hey! Im test' });
});