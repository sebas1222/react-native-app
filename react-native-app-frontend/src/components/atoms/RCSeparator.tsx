import React from "react";
import { View } from "react-native";

interface RCSeparatorProps {
  height?: number;
  backgroundColor?: string;
}

const RCSeparator = ({
  height = 5,
  backgroundColor = "white",
}: RCSeparatorProps) => {
  const RCSeparatorStyles = {
    height: height,
    backgroundColor: backgroundColor,
  };
  return <View style={RCSeparatorStyles}></View>;
};

export default RCSeparator;
