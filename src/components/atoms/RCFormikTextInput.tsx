import React from "react";
import {
  StyleSheet,
  Text,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import RCTextInput from "./RCTextInput";
import { MAIN_COLORS } from "@helpers/theme";
import { useField } from "formik";

interface RCFormikTextInputProps extends TextInputProps {
  name: string;
  styles?: ViewStyle;
  icon?: React.ReactNode;
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
        styles={{
          borderColor:
            meta.error && meta.touched
              ? MAIN_COLORS.danger
              : styles.borderColor,
        }}
        {...props}
        value={field.value}
        onChangeText={(value) => helpers.setValue(value)}
      />
      <Text style={RCFormikTextInputStyles.errorContainer}>
        {meta.touched && meta.error ? meta.error : ""}
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
