<script lang="ts">
	import type { RelayTarget } from '@prisma/client';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	export let target: RelayTarget | null = null;

	const dispatch = createEventDispatcher();

	let dialog: HTMLDialogElement;
	let nickname = '';
	let url = '';
	let method = 'POST';
	let headers = '';
	let isActive = true;

	$: isEditMode = !!target;

	$: if (target) {
		nickname = target.name;
		url = target.url;
		method = 'Post';
		headers = `{"Content-Type": "application/json"}`;
		isActive = true;
	}

	onMount(() => {
		dialog.addEventListener('close', () => {
			resetForm();
		});
	});

	function openModal() {
		dialog.showModal();
	}

	function handleSubmit() {
		if (!target) {
			return;
		}
		const parsedHeaders = JSON.parse(headers);
		const payload = {
			nickname,
			url,
			method,
			headers: parsedHeaders,
			isActive
		};

		if (isEditMode) {
			dispatch('update', { id: target.id, ...payload });
		} else {
			dispatch('create', payload);
		}

		closeModal();
	}

	function closeModal() {
		dialog.close();
	}

	function resetForm() {
		if (!isEditMode) {
			nickname = '';
			url = '';
			method = 'POST';
			headers = '';
			isActive = true;
		}
	}
</script>

<button on:click={openModal} class="btn variant-outline btn-sm">
	{isEditMode ? 'Update' : 'Add'}
</button>

<div>
	<dialog bind:this={dialog} class="card text-on-surface-token">
		<div class="p-6" transition:fly={{ y: 20, duration: 300 }}>
			<h2 class="text-2xl font-bold mb-4">
				{isEditMode ? 'Update' : 'Create'} Webhook Relay Target
			</h2>
			<form on:submit|preventDefault={handleSubmit} class="space-y-4">
				<div>
					<label for="nickname" class="label">Nickname</label>
					<input class="input" type="text" id="nickname" bind:value={nickname} required />
				</div>
				<div>
					<label for="url" class="label">URL</label>
					<input type="url" id="url" bind:value={url} class="input" required />
				</div>

				<label class="flex items-center space-x-2">
					<input class="checkbox" type="checkbox" checked />
					<p>Active</p>
				</label>

				<div class="flex justify-end space-x-3">
					<button
						type="button"
						on:click={closeModal}
						class="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Cancel
					</button>
					<button
						on:click={handleSubmit}
						class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{isEditMode ? 'Update' : 'Create'}
					</button>
				</div>
			</form>
		</div>
	</dialog>
</div>

<style>
	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}
</style>
