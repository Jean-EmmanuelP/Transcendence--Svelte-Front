<script>
	import Sidebar from '$components/sidebar.svelte';
	import Navbar from '$components/navbar.svelte';
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
	let cookieValue;

	onMount(() => {
		cookieValue = Cookies.get('access_token');
		console.log('Cookie Value:', cookieValue);
	});
</script>

<Play />
