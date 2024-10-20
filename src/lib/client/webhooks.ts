import axios from 'axios';
import type { Webhook } from '@prisma/client';
import toast from 'svelte-french-toast';

export async function checkForNewWebhooks() {
	return await axios
		.head('/webhooks')
		.then((response) => {
			if (response.status == 200) {
				return true;
			} else {
				return false;
			}
		})
		.catch((error) => {
			throw new Error(error?.response?.data?.message || error.message);
		});
}

export function getWebhooks() {
	return toast.promise<Webhook[]>(
		axios
			.get('/webhooks')
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return response.data;
				} else {
					throw new Error(response.statusText);
				}
			})
			.catch((error) => {
				throw new Error(error?.response?.data?.message || error.message);
			}),
		{
			loading: 'Fetching webhooks...',
			success: 'updated Webhooks',
			error: (error) => `Failed to fetch webhooks: ${error.message}`
		},
		{ position: 'bottom-center' }
	);
}

export function deleteWebhook(id: number) {
	toast.promise(
		axios
			.delete(`/webhooks/${id}`)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return 'Webhook deleted successfully';
				} else {
					throw new Error(`Failed to delete webhook: ${response.statusText}`);
				}
			})
			.catch((error) => {
				throw new Error(
					`Failed to delete webhook: ${error?.response?.data?.message || error.message}`
				);
			}),
		{
			loading: 'Deleting webhook...',
			success: 'Webhook deleted successfully',
			error: (error) => `Failed to delete webhook: ${error.message}`
		},
		{ position: 'bottom-center' }
	);
}

export function sendWebhook(webhookTarget: string, id: number) {
	toast.promise(
		axios
			.post(`/webhooks/${id}?webhookTarget=${webhookTarget}`)
			.then((response) => {
				if (response.status >= 200 && response.status < 300) {
					return 'Webhook sent successfully';
				} else {
					throw new Error(response.statusText);
				}
			})
			.catch((error) => {
				throw new Error(error?.response?.data?.message || error.message);
			}),
		{
			loading: 'Sending webhook...',
			success: 'Webhook sent successfully',
			error: (error) => `Failed to send webhook: ${error.message}`
		},
		{ position: 'bottom-center' }
	);
}
