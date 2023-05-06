import {
  View,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { Entypo } from "@expo/vector-icons";

export interface RCTextInputProps extends TextInputProps {
  styles?: ViewStyle;
  icon?: React.ReactNode;
  value: string;
  onChangeText: (value: string) => void | undefined;
}

const RCTextInput = ({
  styles,
  value,
  onChangeText,
  icon,
  ...props
}: RCTextInputProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(
    props.secureTextEntry || false
  );
  const handleChange = (value: string) => {
    //revisar
    onChangeText(value);
  };
  return (
    <View style={[RCTextInputStyles.container, styles]}>
      <TextInput
        value={value}
        style={{ flex: 1 }} //ocupa el todo el espacio disponible (resta del espacio total del padre con los elementos secundarios -> Icon)
        onChangeText={handleChange}
        {...props}
        secureTextEntry={hidePassword}
      ></TextInput>
      {props.secureTextEntry && value && value.length > 0 && (
        <Entypo
          name={hidePassword ? "eye" : "eye-with-line"}
          size={24}
          onPress={() => setHidePassword(!hidePassword)}
          color={styles?.borderColor || "grey"}
        />
      )}
      {icon && <View>{icon}</View>}
    </View>
  );
};

const RCTextInputStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 10,
    borderColor: "grey",
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    gap: 5,
  },
});

export default RCTextInput;
