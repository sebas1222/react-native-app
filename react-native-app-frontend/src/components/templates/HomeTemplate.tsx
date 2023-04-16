import React, { useState } from "react";

import { Pressable, Text, View } from "react-native";

const HomeTemplate = () => {
  const [num, setNum] = useState<number>(0);

  return (
    <View>
      <Text>HomeTemplate</Text>
      <Pressable onPress={() => setNum(num + 1)}>
        <Text>Sumar +1 al esto</Text>
      </Pressable>
      <Text>El número es : {num} </Text>
    </View>
  );
};

export default HomeTemplate;
