import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const RCLoadingIndicator = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size={50} />
    </View>
  );
};

export default RCLoadingIndicator;
