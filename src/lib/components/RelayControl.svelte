<script lang="ts">
	import type { Writable } from "svelte/store";
	import AddUpdateModal from "./AddUpdateModal.svelte";

    interface Props {
        webhookTarget: Writable<string>;
        intervalInSeconds: Writable<number>;
    }

    let { webhookTarget, intervalInSeconds }: Props = $props();
</script>

<div class="card p-2">
    <!-- Form for custom webhook URL and interval -->
    <div class="flex flex-row items-end space-x-2">
        <div class="flex-1">
            <label for="custom-url" class="sr-only">Custom Webhook URL</label>
            <input
                id="custom-url"
                class="w-full input text-sm"
                placeholder="Enter webhook URL"
                name="webhookTarget"
                bind:value={$webhookTarget}
            />
        </div>
        <AddUpdateModal/>
        <!-- <select bind:value={$intervalInSeconds} class="select text-sm w-[100px]">
            <option value={1}>1s</option>
            <option value={10}>10s</option>
            <option value={30}>30s</option>
            <option value={60}>1m</option>
            <option value={300}>5m</option>
            <option value={600}>10m</option>
        </select> -->
    </div>
</div>