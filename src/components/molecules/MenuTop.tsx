import React from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { NavigationProps, UserTypes } from '@interfaces/index';
import { useNavigation } from '@react-navigation/native';

interface MenuTopProps {
  dataUser: UserTypes;
}

const MenuTop = ({ dataUser }: MenuTopProps) => {
  const navigation = useNavigation<NavigationProps['UserPerfil']>();
  return (
    <View style={MenuTopStyles.container}>
      <View>
        <AntDesign name="menu-fold" size={24} color="black" />
      </View>
      <View>
        <Text style={[MenuTopStyles.textContainer, TYPOGRAPHY_STYLES.subtitle]}>Inicio</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('UserPerfil', { userId: dataUser.id })}
        >
          <Image
            style={MenuTopStyles.avatarContainer}
            source={dataUser.avatar ? { uri: dataUser.avatar } : require('../../assets/recipe.jpg')}
          ></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const MenuTopStyles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:
      Platform.OS === 'android' ? StatusBar?.currentHeight && StatusBar.currentHeight + 15 : 15,
    paddingBottom: 15,
    paddingHorizontal: 15,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    backgroundColor: MAIN_COLORS.tertiary,
    borderRadius: 999,
    resizeMode: 'cover',
  },
  textContainer: {
    color: MAIN_COLORS.tertiary,
  },
});

export default MenuTop;
