import type { HandleParameters, HandleUtils } from '../index.ts';
import { validateSignature } from './verify.ts';

export async function handleWebhook(this: HandleUtils, { req: { headers }, res, rawBody }: HandleParameters): Promise<void> {
    if (!validateSignature(headers, rawBody)) return this.error();

    res.statusCode = 202;
    res.end();
}

const LIFF_ID = process.env['LINE_LIFF_ID']!;

export async function handleLiff(this: HandleUtils, { res }: HandleParameters): Promise<void> {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
    res.end(
`\
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
</head>
<body>
    <script type="module">
        try {
            await liff.init({ liffId: '${LIFF_ID}' });
            console.log('started successfully!');
        } catch (e) {
            console.error(e);
        }
    </script>
</body>
</html>\
`
    );
}
