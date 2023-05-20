import React from "react";
import {Text, View, StyleSheet, Image, Button, SafeAreaView, Alert} from "react-native"

const Separator = () => <View style={FinLogStyles.separator} />;

const App = () => (
  <SafeAreaView style={FinLogStyles.container}>
    return (
        <View>
      <Text style={FinLogStyles.title}>
        ¿Deseas cerrar sesión?.
      </Text>
      <Button
        title="Logout"
        onPress={() => Alert.alert('Logout')}
      />
    </View>
    <Separator />
    ) 
  </SafeAreaView>
);

const FinLogStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;