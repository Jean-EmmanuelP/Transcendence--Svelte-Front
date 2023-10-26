import { ApolloClient, InMemoryCache, createHttpLink, type DefaultOptions } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'http://68.183.79.168:3000/graphql',
});

const authLink = setContext((_, { headers }) => {
	const token = Cookies.get("access_token");
	if (token)
		return {
			headers: {
				...headers,
				Authorization: `Bearer ${token}`
			},
		};
	else
		return {
			headers: {
			...headers,
			},
		};
});

const defaultOptions: DefaultOptions = {
	watchQuery: {
	  fetchPolicy: 'no-cache',
	  errorPolicy: 'ignore',
	},
	query: {
	  fetchPolicy: 'no-cache',
	  errorPolicy: 'all',
	},
  }

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions,
});

export default client
