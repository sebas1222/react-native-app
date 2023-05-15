import { View, Image, StyleSheet } from 'react-native';
import React from 'react';
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
  const { mutationFn: unFollowUser, loading: loadingFollow } = useMutationAction(UNFOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });
  const { mutationFn: followUser, loading: loadingUnfollow } = useMutationAction(FOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });

  const navigateToUserPerfil = () => {
    navigation.navigate('UserPerfil', { userId: dataUser.id });
  };
  const alreadyFollowing = dataUser.followers.find((user) => user.id === currentUser._id)
    ? true
    : false;

  const handleUnfollow = async () => {
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
            loading={loadingUnfollow}
            onPress={() => handleUnfollow()}
            text="Siguiendo"
            type="primaryButtonInner"
          />
        ) : (
          <RCButton
            loading={loadingFollow}
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
