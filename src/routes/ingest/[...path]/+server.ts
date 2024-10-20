import { handleWebhook } from '$lib/server/webhooks';

export async function POST({ request }) {

	await handleWebhook(request);

    //return a simple 200 response
	return new Response(null, {
		status: 200,
	});
}
