<script lang="ts">
	import { fly } from 'svelte/transition';
	export let isOpen = false,
		top: number,
		left: number;
		console.log(`value of top`, top)
		console.log(`value of left`, top)
</script>

{#if isOpen}
	<div class="fixed top-0 left-0 w-screen h-screen z-50" on:click={() => (isOpen = false)}>
		<div
			transition:fly={{ y: 200, duration: 200 }}
			style="top: {top}px; left: {left}px;"
			on:click={(e) => e.stopPropagation()}
		>
			<slot />
		</div>
	</div>
{/if}
