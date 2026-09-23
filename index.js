import { registerRootComponent } from 'expo';
import { ApolloProvider } from '@apollo/client/react';

import App from './App';
import apolloClient from './apolloClient';

const Root = () => (
  <ApolloProvider client={apolloClient}>
    <App />
  </ApolloProvider>
);

registerRootComponent(Root);