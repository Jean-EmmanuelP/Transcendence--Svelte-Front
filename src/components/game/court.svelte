<script lang="ts">
	export let userinformation, userinformation_opponent;
	/*
    socket connection
    */
	import { onMount } from 'svelte';
	onMount(() => {
		const element = document.querySelector('.court') as HTMLElement;
		if (element) {
			const width = element.offsetWidth;
			const height = element.offsetHeight;

			// Or, for more detailed information including x/y coordinates:
			const rect = element.getBoundingClientRect();

			console.log(`Width: ${width}, Height: ${height}`);
            // Or, if using getBoundingClientRect
			console.log(`Rect:`, rect);
		}
	});
</script>

<div class="court relative h-full w-full flex items-center justify-center text-white text-lg">
	<div class="flex items-center justify-center rounded-full bg-white h-4 w-4" />
	<div class="absolute top-1/2 left-0 h-1/3 w-4 bg-white rounded-md" />
	<div class="absolute top-1/2 right-0 h-1/3 w-4 bg-white rounded-md" />
</div>

<style>
</style>
