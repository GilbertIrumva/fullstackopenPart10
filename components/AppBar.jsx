import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client/react/index.js';

import { ME } from '../graphql/queries';
import AuthStorage from '../utils/authStorage';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
  },
  tabs: {
    flexDirection: 'row',
  },
  tab: {
    padding: 15,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const AppBar = () => {
  const { data } = useQuery(ME);
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.tabs}>
        <Link to="/" component={Pressable} style={styles.tab}>
          <Text style={styles.text}>Repositories</Text>
        </Link>

        {data?.me ? (
          <Pressable onPress={handleSignOut} style={styles.tab}>
            <Text style={styles.text}>Sign out</Text>
          </Pressable>
        ) : (
          <Link to="/signin" component={Pressable} style={styles.tab}>
            <Text style={styles.text}>Sign in</Text>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;