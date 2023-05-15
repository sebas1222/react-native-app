import { FlatList } from 'react-native';
import React, { memo } from 'react';
import { NavigationProps, UserTypes } from '@interfaces/index';
import UserCard from '@molecules/UserCard';
import { StyleSheet } from 'react-native';
import CallToActionCard from '@molecules/CallToActionCard';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome5 } from '@expo/vector-icons';
import { MAIN_COLORS } from '@helpers/theme';

interface UserListProps {
  dataUsers: UserTypes[];
}

const UserList = ({ dataUsers }: UserListProps) => {
  const navigation = useNavigation<NavigationProps['Home']>();
  return (
    <FlatList
      data={dataUsers}
      ListEmptyComponent={
        <CallToActionCard
          description="No hay usuarios que mostrar"
          icon={<FontAwesome5 name="users" size={54} color={MAIN_COLORS.tertiary} />}
          buttonText="Explorar usuarios"
          toAction={() => navigation.navigate('Home')}
        />
      }
      contentContainerStyle={dataUsers.length === 0 && UserListStyles.listEmptyData}
      renderItem={({ item: user }) => <UserCard dataUser={user} />}
    />
  );
};

const UserListStyles = StyleSheet.create({
  listEmptyData: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default memo(UserList);
