import { listWebhooks, newWebhooks } from '$lib/server/webhooks';
import {  json } from '@sveltejs/kit';
import { get } from 'svelte/store';

export async function HEAD() {
    return get(newWebhooks) === true ? new Response(null, { status: 200 }) : new Response(null, { status: 204 });
}

export async function GET() {
	newWebhooks.set(false);
	return json(await listWebhooks());
}
