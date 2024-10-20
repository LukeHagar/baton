import { deleteWebhook, getWebhook } from '$lib/server/webhooks';
import { error, json } from '@sveltejs/kit';
import axios, { AxiosError } from 'axios';

export async function DELETE({ params }) {
	if (!params.id) {
		return error(400, { message: 'Missing webhookId' });
	}

	const webhook = await getWebhook(Number(params.id));

	if (!webhook) {
		return error(404, { message: `Webhook with id ${params.id} not found` });
	}

	try {
		await deleteWebhook(webhook.id);
		return json({ message: 'Webhook deleted successfully' });
	} catch (err) {
		console.error(err);
		return error(500, { message: `Failed to delete webhook: ${err}` });
	}
}

export async function POST({ params, url }) {
	if (!params.id) {
		return error(400, { message: 'Missing webhookId' });
	}

	const webhookTarget = url.searchParams.get('webhookTarget');

	if (!webhookTarget) {
		return error(400, { message: 'Missing webhookTarget' });
	}

	const webhook = await getWebhook(Number(params.id));

	if (!webhook) {
		return error(404, {
			title: 'Webhook not found',
			message: `Webhook with id ${params.id} not found`
		});
	}

	try {
		await axios.post(webhookTarget + webhook.path, webhook.body, {
			headers: JSON.parse(webhook.headers)
		});
		return json({ message: 'Webhook sent successfully' });
	} catch (err) {
		const Error = err as Error | AxiosError;
		if (axios.isAxiosError(Error)) {
			return error(500, {
				title: 'Failed to send Webhook',
				message: Error.cause?.message || Error.message
			});
		} else {
			return error(500, { title: 'Failed to send Webhook', message: Error.message });
		}
	}
}
