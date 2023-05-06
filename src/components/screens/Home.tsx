import { GET_ALL_RECIPES } from "@api/queries";
import { useQuery } from "@apollo/client";
import HomeTemplate from "@templates/HomeTemplate";
import React, { useEffect, useState } from "react";
import { InteractionManager, Text, View } from "react-native";

const Home = () => {
  const [navigationRender, setNavigationRender] = useState<boolean>(false);
  const { loading, error, data, refetch } = useQuery(GET_ALL_RECIPES);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setNavigationRender(true);
    });
  }, []);
  useEffect(() => {
    refetch();
  }, [data]);

  if (loading || !navigationRender) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>{JSON.stringify(error)}</Text>
      </View>
    );
  }

  return <HomeTemplate allRecipes={data.allRecipes} />;
};

export default Home;
