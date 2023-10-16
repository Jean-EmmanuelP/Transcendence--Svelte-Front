<script lang="ts">
	import { fly } from 'svelte/transition';
	export let isOpen = false;
	export let menuTop : null | number = null, menuLeft: null | number = null;
</script>

{#if isOpen}
	<div class="fixed top-0 left-0 w-screen h-screen" on:click={() => (isOpen = false)}>
		<div
			transition:fly={{ y: 200, duration: 200 }}
			class={`absolute top-[${menuTop}px] left-[${menuLeft}px]]`}
			on:click={(e) => e.stopPropagation()}
		>
			<slot />
		</div>
	</div>
{/if}
