<script lang="ts">
	import Highlight from 'svelte-highlight';
	import json from 'svelte-highlight/languages/json';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { github, githubDark } from 'svelte-highlight/styles';
	import type { LanguageType } from 'svelte-highlight/languages';

	export let code = '';
	export let language: LanguageType<string> = json
	export let label = '';

    let header: HTMLElement

	$: console.log($modeCurrent);
</script>

<svelte:head>
	{#if $modeCurrent == true}
		{@html github}
	{:else}
		{@html githubDark}
	{/if}
</svelte:head>

<div class="card w-full h-full overflow-hidden ">
	<header bind:this={header} class=" flex justify-between items-center p-2 bg-surface-200-700-token">
		<div class="flex items-center space-x-2 ">
			{#if label}
				<span class="badge variant-ghost">{label}</span>
			{/if}
			<!-- <span class="badge variant-ghost">{language.name.toUpperCase()}</span> -->
		</div>
		<button class="btn btn-sm variant-ghost" on:click={() => navigator.clipboard.writeText(code)}>
			Copy
		</button>
	</header>
	<section  class="p-4 pb-14 h-full overflow-y-scroll overflow-x-auto">
		<Highlight {language} code={code} />
		<!-- <pre class="text-sm"><code class="hljs {language} font-mono">{@html highlighted}</code></pre> -->
	</section>
</div>

<style>
	/* Ensure Highlight.js styles don't conflict with Skeleton */
	:global(.hljs) {
		background: transparent !important;
		padding: 0 !important;
	}
</style>
