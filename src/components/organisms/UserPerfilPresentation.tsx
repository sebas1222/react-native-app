import { View, Text, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { MAIN_COLORS } from '@helpers/theme';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { UserTypes } from '@interfaces/index';
import RCButton from '@atoms/RCButton';
import UserAvatar from '@molecules/UserAvatar';
import useGetCurrentUser from '@hooks/useGetCurrentUser';
import { FOLLOW_USER, GET_ONE_USER, UNFOLLOW_USER } from '@api/queries';
import { useMutationAction } from '@hooks/useMutationAction';

interface UserPerfilPresentationProps {
  dataUser: UserTypes;
  editable: boolean;
}

const UserPerfilPresentation = ({ dataUser, editable }: UserPerfilPresentationProps) => {
  const { mutationFn: unFollowUser } = useMutationAction(UNFOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });
  const { mutationFn: followUser } = useMutationAction(FOLLOW_USER, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });
  const [isMutating, setIsMutating] = useState(false);
  const currentUser = useGetCurrentUser();

  const handleFollowUser = async () => {
    setIsMutating(true);
    try {
      await followUser({ variables: { idUser: dataUser.id } });
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnfollowUser = async () => {
    setIsMutating(true);
    try {
      await unFollowUser({ variables: { idUser: dataUser.id } });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setIsMutating(false);
  }, [dataUser]);

  const alreadyFollowing = dataUser.followers.find((user) => user.id === currentUser._id)
    ? true
    : false;

  return (
    <View style={UserPerfilPresentationStyles.mainContainer}>
      <View style={[UserPerfilPresentationStyles.sectionContainer, { alignItems: 'flex-start' }]}>
        {!editable &&
          (alreadyFollowing ? (
            <RCButton
              type="primaryButtonInner"
              loading={isMutating}
              loadingIndicatorColor={MAIN_COLORS.primary}
              styles={{ buttonStyles: { padding: 5, width: 50 } }}
              icon={<AntDesign name="deleteuser" size={20} color={MAIN_COLORS.primary} />}
              onPress={() => handleUnfollowUser()}
            />
          ) : (
            <RCButton
              type="primaryButton"
              loading={isMutating}
              styles={{ buttonStyles: { padding: 5, width: 50 } }}
              icon={<AntDesign name="adduser" size={20} color={MAIN_COLORS.quartery} />}
              onPress={() => handleFollowUser()}
            />
          ))}
      </View>
      <View style={UserPerfilPresentationStyles.userPrimaryInfo}>
        <UserAvatar editable={editable} avatarUri={dataUser.avatar} />
        <Text numberOfLines={2} style={{ fontWeight: 'bold' }}>
          {dataUser.name}
        </Text>
      </View>
      <View style={[UserPerfilPresentationStyles.sectionContainer, { alignItems: 'flex-end' }]}>
        {editable && (
          <RCButton
            type="primaryButton"
            styles={{ buttonStyles: { padding: 5 } }}
            icon={<MaterialCommunityIcons name="pencil" size={15} color={MAIN_COLORS.quartery} />}
            onPress={() => console.log('Editar')}
          />
        )}
      </View>
    </View>
  );
};
const UserPerfilPresentationStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: MAIN_COLORS.quartery,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 90,
    padding: 10,
  },
  userPrimaryInfo: {
    transform: [{ translateY: -50 }],
    alignItems: 'center',
    flex: 8 / 10,
    gap: 2,
  },
  sectionContainer: {
    flex: 1 / 10,
  },
});
export default UserPerfilPresentation;
