import type * as http from 'node:http';
import { subtle as subtleCrypto } from 'node:crypto';


const CLIENT_PUBLIC_KEY = await subtleCrypto.importKey(
    'raw',
    Buffer.from(process.env['DISCORD_PUBLIC_KEY']!, 'hex'),
    {
        name: 'ed25519',
        namedCurve: 'ed25519',
    },
    false,
    ['verify'],
);

export async function validateSignature(headers: http.IncomingHttpHeaders, rawBody: string): Promise<boolean> {
    const rawTimestamp = headers['x-signature-timestamp'];
    const rawSignature = headers['x-signature-ed25519'];
    if (typeof rawTimestamp !== 'string' || typeof rawSignature !== 'string') return false;
    const timestamp = Buffer.from(rawTimestamp);
    const signature = Buffer.from(rawSignature, 'hex');
    const message = Buffer.concat([timestamp, Buffer.from(rawBody)]);

    return await subtleCrypto.verify(
        {
            name: 'ed25519',
        },
        CLIENT_PUBLIC_KEY,
        signature,
        message,
    );
}
