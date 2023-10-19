<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import Glassmorphism from '$components/glassmorphism.svelte'

	export let data;

	onMount(async () => {
		console.log(data.user);
	});
</script>

<Glassmorphism />
<!-- <Play /> -->
