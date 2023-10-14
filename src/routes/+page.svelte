<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { activePage } from '../stores/currentNavigation';
	import Messages from '$components/message.svelte';
  import { ApolloClient, InMemoryCache } from '@apollo/client/core';
	import Profile from '$components/profile.svelte';

	export let data;

	onMount(async () => {
		console.log(data.user);
	});
</script>

<Play />
