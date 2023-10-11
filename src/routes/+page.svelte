<script>
	import Sidebar from '$components/sidebar.svelte';
	import Navbar from '$components/navbar.svelte';
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { page, navigating } from '$app/stores';
	import { activePage } from '../stores/currentNavigation';
	let cookieValue;

	onMount(() => {
		cookieValue = Cookies.get('access_token');
		console.log('Cookie Value:', cookieValue);
	});
</script>

{#if $activePage === 'dashboard'}
	<Play />
{:else if $activePage === 'messages'}
	<Messages />
{:else}
	<p>Page non trouvee</p>
{/if}