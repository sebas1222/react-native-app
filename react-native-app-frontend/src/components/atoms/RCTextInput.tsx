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
  value?: string;
  onChangeText?: (value: string) => void;
  secureTextEntry?: boolean;
}

const RCTextInput = ({
  styles,
  value,
  onChangeText,
  icon,
  secureTextEntry,
  ...props
}: RCTextInputProps) => {
  const [hidePassword, setHidePassword] = useState<boolean>(
    secureTextEntry || false
  );
  const [internValue, setInternValue] = useState<string>("");
  const handleChange = (value: string) => {
    //revisar
    if (onChangeText) {
      // input controlado
      if (!value) {
        setHidePassword(true);
      }
      onChangeText(value);
    } else {
      // input no controlado
      setInternValue(value);
    }
  };
  return (
    <View style={[RCTextInputStyles.container, styles]}>
      <TextInput
        value={value ? value : internValue}
        style={{ flex: 1 }} //ocupa el todo el espacio disponible (resta del espacio total del padre con los elementos secundarios -> Icon)
        onChangeText={handleChange}
        secureTextEntry={hidePassword}
        {...props}
      ></TextInput>
      {secureTextEntry && value && value.length > 0 && (
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
