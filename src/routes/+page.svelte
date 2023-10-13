<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { activePage } from '../stores/currentNavigation';
	import Messages from '$components/message.svelte';
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