import { createReadStream } from 'node:fs';
import type { HandleParameters, HandleUtils } from './index.ts';


export async function handleFavicon(this: HandleUtils, { res }: HandleParameters): Promise<void> {
    const stream = createReadStream('./assets/favicon.ico');
    res.writeHead(200, { 'content-type': 'image/x-icon' });
    stream.pipe(res);
}
