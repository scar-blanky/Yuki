import type { HandleParameters, HandleUtils } from '../index.ts';
import { InteractionResponseType, InteractionType, type APIInteraction } from 'discord-api-types/v10';
import { validateSignature } from './verify.ts';


export async function handleWebhook(this: HandleUtils, { req: { headers }, res, rawBody }: HandleParameters): Promise<void> {
    if (await validateSignature(headers, rawBody)) return this.error();

    const body = JSON.parse(rawBody) as APIInteraction;
    switch (body.type) {
        case InteractionType.Ping:
            res.setHeader('Content-Type', 'application/json');
            res.end(
                JSON.stringify({
                    type: InteractionResponseType.Pong,
                }),
            );
            return;
    }

    this.error();
}
