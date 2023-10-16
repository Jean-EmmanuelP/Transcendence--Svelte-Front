<script lang="ts">
	import { fly } from 'svelte/transition';
	export let isOpen = false;
</script>

{#if isOpen}
	<div class="" on:click={() => (isOpen = false)}>
		<div transition:fly={{ y: 200, duration: 200 }}>
			<slot />
		</div>
	</div>
{/if}
