import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';

import { relayStylePagination } from '@apollo/client/utilities';

import { SetContextLink } from '@apollo/client/link/context';

import AuthStorage from './utils/authStorage';

const httpLink = new HttpLink({
  uri: process.env.EXPO_PUBLIC_APOLLO_URI,
});

const authStorage = new AuthStorage();

const authLink = new SetContextLink(async (_, { headers }) => {
  const accessToken = await authStorage.getAccessToken();

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination(),
        },
      },
      Repository: {
        fields: {
          reviews: relayStylePagination(),
        },
      },
    },
  }),
});

export default apolloClient;