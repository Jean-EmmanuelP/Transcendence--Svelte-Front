<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';

	export let data;

	onMount(async () => {
		console.log(data.user);
	});
</script>

<Play />
