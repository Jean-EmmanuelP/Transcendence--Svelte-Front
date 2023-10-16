<script lang="ts">
	import { fly } from 'svelte/transition';
	export let isOpen = false;
</script>

{#if isOpen}
	<div class="w-screen h-screen transparent" on:click={() => (isOpen = false)}>
		<div transition:fly={{ y: 200, duration: 200 }} on:click={(e) => e.stopPropagation()}>
			<slot />
		</div>
	</div>
{/if}
