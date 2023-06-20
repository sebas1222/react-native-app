import { Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import { CONTAINER_STYLES } from '@helpers/theme';

const SearchTemplate = () => {
  return (
    <SafeAreaView style={[CONTAINER_STYLES.mainContainer, SearchTemplateStyles.mainContainer]}>
      <Text>SearchTemplate</Text>
      {/*Aca añade tu codigo Will*/}
    </SafeAreaView>
  );
};

const SearchTemplateStyles = StyleSheet.create({
  mainContainer: {
    gap: 15,
  },
});

export default SearchTemplate;
