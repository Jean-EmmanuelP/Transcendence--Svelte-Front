import { Client, cacheExchange, fetchExchange } from '@urql/svelte'

const client = new Client({
    url: "http://42pong.com:3000/graphql",
    exchanges: [cacheExchange, fetchExchange],
});

export default client;