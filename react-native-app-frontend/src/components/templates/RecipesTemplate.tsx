import { View, Text, InteractionManager } from "react-native";
import React, { useEffect, useState } from "react";

const RecipesTemplate = () => {
  const [navigationRender, setNavigationRender] = useState<boolean>(false);
  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setNavigationRender(true);
    });
  }, []);
  if (!navigationRender) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  return (
    <View>
      <Text>RecipesTemplate</Text>
    </View>
  );
};

export default RecipesTemplate;
