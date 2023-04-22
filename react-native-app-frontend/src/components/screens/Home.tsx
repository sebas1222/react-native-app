import HomeTemplate from "@templates/HomeTemplate";
import React, { useEffect, useState } from "react";
import { InteractionManager, Text, View } from "react-native";

const Home = () => {
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

  return <HomeTemplate />;
};

export default Home;
