import { SafeAreaView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RCTextInput from '@atoms/RCTextInput';
import { CONTAINER_STYLES } from '@helpers/theme';

const FavoritesTemplate = () => {
  const [query, setQuery] = useState<string>('');
  return (
    <SafeAreaView style={CONTAINER_STYLES.mainContainer}>
      <RCTextInput value={query} onChangeText={(value) => setQuery(value)} />
    </SafeAreaView>
  );
};

const FavoritesTemplateStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'red',
  },
});

export default FavoritesTemplate;
