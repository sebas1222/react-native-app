import React from "react";
import { StyleSheet, Text, View } from "react-native";
import RCTextInput, { RCTextInputProps } from "./RCTextInput";
import { MAIN_COLORS } from "@helpers/theme";
import { useField } from "formik";

interface RCFormikTextInputProps extends RCTextInputProps {
  name: string;
}
//Componente realizado para estar dentro de un componente Formik
const RCFormikTextInput = ({
  name,
  styles = { borderColor: "grey" }, //border por defecto
  ...props
}: RCFormikTextInputProps) => {
  const [field, meta, helpers] = useField(name);

  return (
    <View style={RCFormikTextInputStyles.container}>
      <RCTextInput
        value={field.value}
        styles={{
          borderColor:
            meta.error && meta.touched
              ? MAIN_COLORS.danger
              : styles.borderColor,
        }}
        onChangeText={(value) => helpers.setValue(value)}
        {...props}
      />
      <Text style={RCFormikTextInputStyles.errorContainer}>
        {meta.touched && meta.error ? meta.error : " "}
      </Text>
    </View>
  );
};

const RCFormikTextInputStyles = StyleSheet.create({
  container: {
    gap: 5,
  },
  errorContainer: {
    color: MAIN_COLORS.danger,
    fontSize: 10,
  },
});

export default RCFormikTextInput;
