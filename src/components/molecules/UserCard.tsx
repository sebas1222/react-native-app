import { View, Image, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import RCButton from '@atoms/RCButton';
import { MAIN_COLORS } from '@helpers/theme';
import { NavigationProps, UserTypes } from '@interfaces/index';
import { useNavigation } from '@react-navigation/native';
import RCTextLink from '@atoms/RCTextLink';
import useGetCurrentUser from '@hooks/useGetCurrentUser';
import { useMutationAction } from '@hooks/useMutationAction';
import { FOLLOW_USER, GET_ONE_USER, UNFOLLOW_USER } from '@api/queries';

interface UserCardProps {
  dataUser: UserTypes;
}

const UserCard = ({ dataUser }: UserCardProps) => {
  const navigation = useNavigation<NavigationProps['UserPerfil']>();
  const currentUser = useGetCurrentUser();
  const [isMutating, setIsMutating] = useState(false);
  const { mutationFn: unFollowUser } = useMutationAction(UNFOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });
  const { mutationFn: followUser } = useMutationAction(FOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });

  const navigateToUserPerfil = () => {
    navigation.navigate('UserPerfil', { userId: dataUser.id });
  };
  const alreadyFollowing = dataUser.followers.find((user) => user.id === currentUser._id)
    ? true
    : false;

  // cada vez que se realize la accion de seguir o no seguir se hara un refetch por ende la dataUser pasada por props cambiara
  // y cuando ya se ha hecho el refetch y se ha pasado la nueva data recien seteamos el loading en false, de esta forma
  //aseguramos que el redenrizado condicional se haga adecuadamente
  useEffect(() => {
    setIsMutating(false);
  }, [dataUser]);

  const handleUnfollow = async () => {
    setIsMutating(true);
    try {
      await unFollowUser({
        variables: {
          idUser: dataUser.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleFollow = async () => {
    setIsMutating(true);
    try {
      await followUser({
        variables: {
          idUser: dataUser.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  console.log({ dataUser });

  return (
    <View style={UserCardStyles.container}>
      <View style={UserCardStyles.primaryInfoContainer}>
        <Image
          style={UserCardStyles.avatarContainer}
          source={
            dataUser?.avatar ? { uri: dataUser?.avatar } : require('../../assets/userprofile.png')
          }
        />

        <RCTextLink
          onPress={() => navigateToUserPerfil()}
          text={dataUser.id === currentUser._id ? 'Yo' : dataUser.name}
        />
      </View>
      {!(dataUser.id === currentUser._id) ? (
        alreadyFollowing ? (
          <RCButton
            loading={isMutating}
            styles={{ buttonStyles: { width: 110 } }}
            loadingIndicatorColor={MAIN_COLORS.primary}
            onPress={() => handleUnfollow()}
            text="Siguiendo"
            type="primaryButtonInner"
          />
        ) : (
          <RCButton
            loading={isMutating}
            styles={{ buttonStyles: { width: 110 } }}
            onPress={() => handleFollow()}
            text="Seguir"
            type="primaryButton"
          />
        )
      ) : null}
    </View>
  );
};

const UserCardStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: MAIN_COLORS.quartery,
    padding: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f3f3',
  },
  primaryInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatarContainer: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 999,
  },
  textContainer: {
    fontWeight: '700',
  },
});

export default UserCard;
