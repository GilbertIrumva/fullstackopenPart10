import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';

import Main from './components/Main';
import AppBar from './components/AppBar';
import apolloClient from './apolloClient';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <NativeRouter>
        <View style={styles.container}>
          <AppBar />
          <Main />
          <StatusBar style="auto" />
        </View>
      </NativeRouter>
    </ApolloProvider>
  );
}