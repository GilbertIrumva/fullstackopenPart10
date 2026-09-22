import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
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
  return (
    <View style={styles.container}>
      <Link to="/" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Repositories</Text>
      </Link>

      <Link to="/signin" component={Pressable} style={styles.tab}>
        <Text style={styles.text}>Sign in</Text>
      </Link>
    </View>
  );
};

export default AppBar;