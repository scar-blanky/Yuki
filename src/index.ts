import * as http from 'node:http';
import * as Discord from './discord/index.ts';
import * as Line from './line/index.ts';
import { handleFavicon } from './favicon.ts';


type Req = Parameters<http.RequestListener>[0];
type Res = Parameters<http.RequestListener>[1];

export interface HandleUtils {
    error(): void;
}

export interface HandleParameters {
    req: Req;
    res: Res;
    rawBody: string;
}

type HandleFunction = (this: HandleUtils, obj: HandleParameters) => void | Promise<void>;

const routes: Readonly<Record<string, Record<string, HandleFunction>>> = Object.freeze({
    GET: {
        '/favicon.ico': handleFavicon,
        '/liff': Line.handleLiff,
    },
    POST: {
        '/webhook/discord': Discord.handleWebhook,
        '/webhook/line': Line.handleWebhook,
    },
});

http.createServer(async (req, res) => {
    const utils = createHandleUtils(res);
    const [url, params] = req.url!.split('?', 2) as [string, string | undefined];
    const searchParams = new URLSearchParams(params);
    const route = routes[req.method!]?.[url];

    console.log(searchParams);

    if (!route) return utils.error();

    req.setEncoding('utf-8');
    const rawBody = await req.reduce((acc, cur) => acc + cur, '');

    await route.call(utils, { req, res, rawBody });
}).listen(8080, () => {
    console.log("Server started!");
});


function createHandleUtils(res: Res): HandleUtils {
    return {
        error() {
            res.statusCode = 400;
            res.end();
        },
    };
}
