import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
    marginTop: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const validationSchema = Yup.object().shape({
  ownerName: Yup.string()
    .required('Repository owner is required'),

  repositoryName: Yup.string()
    .required('Repository name is required'),

  rating: Yup.number()
    .required('Rating is required')
    .min(0, 'Rating must be at least 0')
    .max(100, 'Rating must be at most 100'),

  text: Yup.string(),
});

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        ownerName: '',
        repositoryName: '',
        rating: '',
        text: '',
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput
            name="ownerName"
            placeholder="Repository owner"
            autoCapitalize="none"
          />

          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            autoCapitalize="none"
          />

          <FormikTextInput
            name="rating"
            placeholder="Rating between 0 and 100"
            keyboardType="numeric"
          />

          <FormikTextInput
            name="text"
            placeholder="Review"
            multiline
            numberOfLines={5}
            textAlignVertical="top"
          />

          <Pressable
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Create review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReviewContainer;