import { Formik } from 'formik';
import * as yup from 'yup';

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import Text from './Text';
import FormikTextInput from './FormikTextInput';

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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be at least 5 characters')
    .max(30, 'Username must be at most 30 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be at least 5 characters')
    .max(50, 'Password must be at most 50 characters'),

  passwordConfirmation: yup
    .string()
    .oneOf(
      [yup.ref('password')],
      'Passwords do not match'
    )
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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

          <FormikTextInput
            name="passwordConfirmation"
            placeholder="Password confirmation"
            secureTextEntry
            autoCapitalize="none"
          />

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>
              Sign up
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUpContainer;