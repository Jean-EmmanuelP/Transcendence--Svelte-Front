<script lang="ts">
// @ts-nocheck

	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { activePage } from '../stores/currentNavigation';
	import Messages from '$components/message.svelte';

	export let data;

	onMount(async () => {
		console.log(data.user);
	});
</script>

{#if $activePage === 'dashboard'}
	<Play />
{:else if $activePage === 'messages'}
	<Messages />
{:else}
	<p>Page non trouvee</p>
{/if}
