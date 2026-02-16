import type * as http from 'node:http';
import { createHmac, timingSafeEqual } from 'node:crypto';


const CHANNEL_SECRET = process.env['LINE_CHANNEL_SECRET']!;

function safeCompare(a: Buffer, b: Buffer): boolean {
    return a.length === b.length && timingSafeEqual(a, b);
}

export function validateSignature(headers: http.IncomingHttpHeaders, rawBody: string | Buffer): boolean {
    const rawSignature = headers['x-line-signature'];
    if (typeof rawSignature !== 'string') return false;
    const signature = Buffer.from(rawSignature, 'base64');

    return safeCompare(
        createHmac('SHA256', CHANNEL_SECRET).update(rawBody).digest(),
        signature,
    );
}
