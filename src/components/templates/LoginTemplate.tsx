import { CONTAINER_STYLES } from '@helpers/theme';
import LoginForm from '@organisms/LoginForm';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

const LoginTemplate = () => {
  return (
    <SafeAreaView style={[CONTAINER_STYLES.mainContainer, LoginTemplateStyles.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <LoginForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const LoginTemplateStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#f3f3f3',
  },
});

export default LoginTemplate;
