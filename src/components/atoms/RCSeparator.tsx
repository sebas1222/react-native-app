import React from "react";
import { ColorValue, View } from "react-native";

interface RCSeparatorProps {
  height?: number;
  width?: number;
  backgroundColor?: ColorValue;
}

const RCSeparator = ({
  width = 20,
  height = 10,
  backgroundColor = "#f3f3f3",
}: RCSeparatorProps) => {
  const RCSeparatorStyles = {
    height,
    backgroundColor,
    width,
  };
  return <View style={RCSeparatorStyles}></View>;
};

export default RCSeparator;
