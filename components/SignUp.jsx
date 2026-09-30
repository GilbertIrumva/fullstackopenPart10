import { useMutation } from '@apollo/client/react/index.js';
import { useNavigate } from 'react-router-native';

import { CREATE_USER } from '../graphql/mutations';

import useSignIn from '../hooks/useSignIn';

import SignUpContainer from './SignUpContainer';

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);

  const [signIn] = useSignIn();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({
        variables: {
          user: {
            username,
            password,
          },
        },
      });

      await signIn({
        username,
        password,
      });

      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;