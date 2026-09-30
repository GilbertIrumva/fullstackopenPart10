import { Route, Routes } from 'react-router-native';

import RepositoryList from './RepositoryList';
import Repository from './Repository';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';

const Main = () => {
  return (
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
        path="/signup"
        element={<SignUp />}
      />

      <Route
        path="/createreview"
        element={<CreateReview />}
      />

      <Route
        path="/myreviews"
        element={<MyReviews />}
      />
    </Routes>
  );
};

export default Main;