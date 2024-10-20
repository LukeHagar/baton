<script lang="ts">
	import { browser } from '$app/environment';
	import { deleteWebhook, getWebhooks, sendWebhook } from '$lib/client/webhooks';
	import RelayControl from '$lib/components/RelayControl.svelte';
	import WebhookInspect from '$lib/components/WebhookInspect.svelte';
	import type { Webhook } from '@prisma/client';
	import { AppBar, LightSwitch } from '@skeletonlabs/skeleton';
	import { RefreshCw, Trash2 } from 'lucide-svelte';
	import { onDestroy } from 'svelte';
	import { persisted } from 'svelte-persisted-store';
	import { writable, type Writable } from 'svelte/store';
	import { fly } from 'svelte/transition';

	const webhooks: Writable<Webhook[]> = writable([]);

	let refreshInterval: NodeJS.Timeout;

	const intervalInSeconds: Writable<number> = persisted('intervalInSeconds', 1);
	const webhookTarget: Writable<string> = persisted('webhookTarget', '');
	const selectedWebhook: Writable<Webhook | undefined> = persisted('selectedWebhook', undefined);

	function createInterval(intervalInSeconds: number) {
		clearInterval(refreshInterval);

		if (browser) {
			// Fetch webhooks on load, and on interval update
			getWebhooks().then((data) => webhooks.set(data));
		}

		// Start the interval
		refreshInterval = setInterval(async () => {
			console.log('Refreshing webhooks');
			webhooks.set(await (await fetch('/webhooks')).json());
		}, 1000 * intervalInSeconds);
	}

	intervalInSeconds.subscribe((value) => createInterval(value));
	webhooks.subscribe((webhooks) => {
		if ($selectedWebhook == null && webhooks?.length > 0) {
			selectedWebhook.set(webhooks[0]);
		}
	});

	onDestroy(() => {
		clearInterval(refreshInterval);
	});
</script>

<div class="flex flex-col h-screen">
	<AppBar padding="p-2">
		<svelte:fragment slot="lead">Hooky</svelte:fragment>
		<svelte:fragment slot="trail">
			<LightSwitch />
		</svelte:fragment>
	</AppBar>

	<div class="h-full overflow-hidden">
		<div class="h-full flex gap-4 p-4">
			<!-- Sidebar (Webhooks List) -->
			<div class="w-1/3 flex flex-col space-y-2">
				<RelayControl {webhookTarget} {intervalInSeconds} />
				<div class="flex-1 overflow-hidden">
					<div class="h-full overflow-y-auto px-1 space-y-2 custom-scrollbar">
						{#each $webhooks as webhook (webhook.id)}
							<button
								class="relative overflow-hidden bg-white bg-opacity-80 backdrop-blur-sm card shadow cursor-pointer hover:shadow-md transition-shadow duration-200 w-full"
								class:selected={$selectedWebhook?.id == webhook.id}
								on:click|preventDefault={() => selectedWebhook.set(webhook)}
								transition:fly|local={{ x: -200, duration: 200 }}
							>
								{#if $selectedWebhook?.id == webhook.id}
									<!-- Active border indicator -->
									<div
										class="absolute inset-0 border-2 border-blue-500 rounded-container-token pointer-events-none"
									/>
								{/if}
								<div class="p-2 relative">
									<div class="flex justify-between items-center mb-1">
										<div class="flex items-center space-x-2">
											<span class="px-1 py-0.5 rounded-token text-xs font-mono bg-gray-200">
												{webhook.method}
											</span>
											<span class="text-xs font-medium truncate" title={webhook.path}>
												{webhook.path}
											</span>
										</div>
										<span class="text-xs text-gray-500">
											{new Date(webhook.createdAt).toLocaleString()}
										</span>
									</div>
									<div class="flex justify-between items-center">
										<span class="text-xs text-gray-500">
											ID: <span class="font-mono" title={webhook.id.toString()}>
												{webhook.id}
											</span>
										</span>
										<span>
											<button
												type="submit"
												on:click|stopPropagation={() => sendWebhook($webhookTarget, webhook.id)}
												class="btn variant-outline btn-sm"
												aria-label="Resend webhook"
											>
												<RefreshCw class="h-3 w-3 mr-1" />
												Resend
											</button>
											<button
												on:click|stopPropagation={() => deleteWebhook(webhook.id)}
												type="submit"
												formaction="?/delete?webhookId={webhook.id}"
												class="btn variant-outline btn-sm"
												aria-label="Delete webhook"
											>
												<Trash2 class="h-3 w-3 mr-1" />
												Delete
											</button>
										</span>
									</div>
								</div>
							</button>
						{/each}
					</div>
				</div>
			</div>
			<!-- Main Content (Headers and Request Body) -->
			<div class="w-2/3 flex flex-col space-y-2">
				<WebhookInspect {selectedWebhook} />
			</div>
		</div>
	</div>
</div>
