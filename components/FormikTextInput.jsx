import { useField } from "formik";
import { StyleSheet, TextInput as NativeTextInput, View } from "react-native";
import Text from "./Text";

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#586069",
    borderRadius: 4,
    padding: 12,
    marginBottom: 5,
    backgroundColor: "white",
  },
  error: {
    borderColor: "#d73a4a",
  },
  errorText: {
    color: "#d73a4a",
    marginBottom: 15,
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);

  const showError = meta.touched && meta.error;

  return (
    <View>
      <NativeTextInput
        style={[styles.input, showError && styles.error]}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />

      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </View>
  );
};

export default FormikTextInput;
