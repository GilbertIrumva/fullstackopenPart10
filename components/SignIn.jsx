import { Formik } from 'formik';
import { Pressable, StyleSheet, View } from 'react-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 15,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({
        username,
        password,
      });

      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik
      initialValues={{
        username: '',
        password: '',
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.username) {
          errors.username = 'Username is required';
        }

        if (!values.password) {
          errors.password = 'Password is required';
        }

        return errors;
      }}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="username"
            placeholder="Username"
            autoCapitalize="none"
          />

          <FormikTextInput
            name="password"
            placeholder="Password"
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;