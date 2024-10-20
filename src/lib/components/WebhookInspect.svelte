<script lang="ts">
	import CodeBlock from '$lib/components/CodeBlock.svelte';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import { PaneGroup, Pane, PaneResizer } from 'paneforge';
	import type { Webhook } from '@prisma/client';
	import { type Writable } from 'svelte/store';
	import { GripVertical, GripHorizontal } from 'lucide-svelte';

	export let selectedWebhook: Writable<Webhook | undefined>;

	let showHeaders = true;
	let showBody = true;
	let value: number = 0;

	$: console.log(value);
</script>

{#if $selectedWebhook}

	<div class="flex justify-end gap-2 items-center ">
		<!-- <RadioGroup>
			<RadioItem bind:group={value} name="justify" value={0}>(label)</RadioItem>
			<RadioItem bind:group={value} name="justify" value={1}>(label)</RadioItem>
			<RadioItem bind:group={value} name="justify" value={2}>(label)</RadioItem>
		</RadioGroup>
		<button class="btn btn-sm variant-outline" on:click={() => (showHeaders = !showHeaders)}>
			{(showHeaders ? 'Hide' : 'Show') + ' Headers'}
		</button>
		<button class="btn btn-sm variant-outline" on:click={() => (showBody = !showBody)}>
			{(showBody ? 'Hide' : 'Show') + ' Body'}
		</button> -->
	</div>
	<PaneGroup direction="vertical" class="w-full rounded-lg" autoSaveId="inspectPane">
		{#if showHeaders}
			<Pane defaultSize={25} class="rounded-lg bg-muted">
				<CodeBlock
					label="Headers"
					code={JSON.stringify(JSON.parse($selectedWebhook.headers), null, 2)}
				/>
			</Pane>
		{/if}
		{#if showHeaders && showBody}
			<PaneResizer
				class="relative flex h-2 my-4 items-center justify-center bg-surface-backdrop-token rounded-full"
			>
				<div
					class="z-10 flex h-5 w-7 items-center justify-center rounded-sm border bg-primary-backdrop-token bg-primary-hover-token"
				>
					<GripHorizontal class="size-4 text-black" />
				</div>
			</PaneResizer>
		{/if}
		{#if showBody}
			<Pane defaultSize={75} class="rounded-lg bg-muted">
				<CodeBlock label="Body" code={JSON.stringify(JSON.parse($selectedWebhook.body), null, 2)} />
			</Pane>
		{/if}
	</PaneGroup>
{/if}
