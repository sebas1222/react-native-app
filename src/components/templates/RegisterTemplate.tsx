import { CONTAINER_STYLES } from '@helpers/theme';
import RegisterForm from '@organisms/RegisterForm';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

const RegisterTemplate = () => {
  return (
    <SafeAreaView style={[CONTAINER_STYLES.mainContainer, RegisterTemplateStyles.mainContainer]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
      >
        <RegisterForm />
      </ScrollView>
    </SafeAreaView>
  );
};

const RegisterTemplateStyles = StyleSheet.create({
  mainContainer: {
    gap: 15,
  },
});

export default RegisterTemplate;
