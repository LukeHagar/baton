import type { Actions } from './$types';
import { createTarget } from '$lib/server/targets';
import { getWebhook, sendWebhook, clearWebhooks } from '$lib/server/webhooks';
import { fail } from '@sveltejs/kit';

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();

		const name = data.get('relayName');
		const url = data.get('relayUrl');

		if (!name) {
			return fail(400, { message: 'Unable to add relay target: missing name' });
		}

		if (!url) {
			return fail(400, { message: 'Unable to add relay target: missing url' });
		}

		try {
			const target = await createTarget(name.toString(), url.toString());
			return { success: true, type: 'relay', message: 'Relay target created successfully', target };
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Failed to create target' });
		}
	},

	clear: async () => {
		await clearWebhooks();
		return { success: true, type: 'webhook', message: 'Webhooks cleared successfully' };
	},

	send: async ({ request }) => {
		const data = await request.formData();

		const type = "webhook"

		const webhookId = data.get('webhookId');
		const webhookTarget = data.get('webhookTarget');

		if (!webhookId) {
			return fail(400, { type,error: 'Missing webhookId' });
		}

		if (!webhookTarget) {
			return fail(400, { type,error: 'Missing webhookTarget' });
		}

		const webhook = await getWebhook(Number(webhookId));

		if (!webhook) {
			return fail(404, { type,error: 'Webhook with id ' + webhookId + ' not found' });
		}

		try {
			const webhookResp = await sendWebhook(webhookTarget.toString(), webhook);

			if (webhookResp.status === 200) {
				return { success: true,type, message: 'Webhook sent successfully', webhook };
			} else {
				return fail(500, { type,error: 'Failed to send webhook' });
			}
		} catch (error) {
			console.error(error);
			return fail(500, { type,error: 'Failed to send webhook' });
		}
	}
} satisfies Actions;
