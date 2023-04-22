import RCSeparator from "@atoms/RCSeparator";
import { MAIN_COLORS } from "@helpers/theme";
import { Character, GetAllCharactersType } from "@interfaces/index";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";

const TodoList = () => {
  const [characterInfo, setCharacterInfo] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getAllCharacters = async (): Promise<GetAllCharactersType> => {
    try {
      const rsp = await fetch("https://rickandmortyapi.com/api/character", {
        method: "GET",
      });
      const data = await rsp.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllCharacters()
      .then((data) => setCharacterInfo(data.results))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  } else {
    return (
      <View style={styles.container}>
        <Text>Ir a Login</Text>
        <FlatList
          ListFooterComponent={<RCSeparator height={20} />}
          ListFooterComponentStyle={{ marginBottom: 60 }}
          data={characterInfo}
          ItemSeparatorComponent={() => (
            <RCSeparator height={20} backgroundColor={MAIN_COLORS.quartery} />
          )}
          renderItem={(
            { item: character } //con renderitem cada elemento recibe el nombre de item siempre:
          ) => (
            <View style={styles.cardContainer} key={character?.id}>
              <View style={styles.cardLayout}>
                <Text>ID:{character?.id}</Text>
                <Text>Name:{character?.name}</Text>
                <Text>Status:{character?.status}</Text>
              </View>

              <View style={styles.cardImageContainer}>
                <Image
                  style={styles.cardImage}
                  source={{ uri: character.image }}
                ></Image>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: MAIN_COLORS.quartery,
  },
  cardContainer: {
    padding: 10,
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardLayout: {
    flex: 0.5,
  },
  cardImageContainer: {
    flex: 0.5,
  },
  cardImage: {
    resizeMode: "contain",
    aspectRatio: 1 / 1,
  },
});

export default TodoList;
