<script>
  import { Client, cacheExchange, fetchExchange } from '@urql/core';
  import { query, setContext } from '@urql/svelte';
  import { gql } from 'graphql-tag';

  // Initialisation du client
  const client = new Client({
    url: 'http://42pong.com:3000/graphql',
    exchanges: [cacheExchange, fetchExchange],
  });

  setContext({ client }); // Passer le client au contexte

  // Définir et exécuter la requête
  const QUERY = gql`
    query {
      testingConnexion
    }
  `;

  const test = query(QUERY);

</script>

<h1 class="text-3xl font-bold underline bg-red-500 text-center p-2 w-full h-full">Hello world!</h1>

{#if $test.fetching}
  <p>Loading ...</p>
{:else if $test.error}
  <p>Oh no... {$test.error.message}</p>
{:else}
  <p>{$test.data.testingConnexion}</p>
{/if}
