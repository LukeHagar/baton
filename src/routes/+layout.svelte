<script lang="ts">
	import { Toaster } from 'svelte-french-toast';
	import type { Snippet } from 'svelte';

	import '../app.css';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<Toaster />

{@render children?.()}
