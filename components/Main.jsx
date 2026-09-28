import { StyleSheet, View } from 'react-native';

import {
  NativeRouter,
  Route,
  Routes,
} from 'react-router-native';

import AppBar from './AppBar';

import RepositoryList from './RepositoryList';

import Repository from './Repository';

import SignIn from './SignIn';

import CreateReview from './CreateReview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e4e8',
  },
});

const Main = () => {
  return (
    <NativeRouter>
      <View style={styles.container}>
        <AppBar />

        <Routes>
          <Route
            path="/"
            element={<RepositoryList />}
          />

          <Route
            path="/repositories/:id"
            element={<Repository />}
          />

          <Route
            path="/signin"
            element={<SignIn />}
          />

          <Route
            path="/createreview"
            element={<CreateReview />}
          />
        </Routes>
      </View>
    </NativeRouter>
  );
};

export default Main;