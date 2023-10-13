<script>
	import Play from '$components/play.svelte';
	import { onMount } from 'svelte';
	import { activePage } from '../stores/currentNavigation';
	import Messages from '$components/message.svelte';
	import {testRequest} from "../services/gqlTest"
  import { ApolloClient, InMemoryCache } from '@apollo/client/core';
	import Setting from '../components/setting.svelte';

  onMount(async () => {
    const client = new ApolloClient({
      uri: 'http://42pong.com:3000/graphql',
      cache: new InMemoryCache()
    });

    // const response = await client.query({
    //   query: gql`
    //     {
	// 		testingConnexion
    //     }
    //   `
    // });
	await testRequest();
	// console.log("Data", response.data)
});
</script>

{#if $activePage === 'dashboard'}
	<Play />
{:else if $activePage === 'messages'}
	<Messages />
{:else if $activePage === 'statistics'}
	<Setting />
{/if}

