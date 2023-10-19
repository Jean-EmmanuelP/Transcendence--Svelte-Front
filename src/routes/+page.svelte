<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import Glassmorphism from '$components/experience/glassmorphism.svelte'
	import Background from '$components/experience/background.svelte'

	export let data;

	onMount(async () => {
		console.log(data.user);
	});
</script>

<!-- <Glassmorphism /> -->
<!-- <Play /> -->
<Background />