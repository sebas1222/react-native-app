import { View, StyleSheet, Image, Modal, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import RCButton from '@atoms/RCButton';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { uploadImagesCloudinary } from '@helpers/cloudinary';
import { useMutationAction } from '@hooks/useMutationAction';
import { GET_ONE_USER, UPDATE_USER_AVATAR } from '@api/queries';
import * as ImagePicker from 'expo-image-picker';

interface UserAvatarProps {
  editable: boolean;
  avatarUri?: string;
}

const UserAvatar = ({ editable, avatarUri }: UserAvatarProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [modalPhoto, setModalPhoto] = useState<boolean>(false);
  const [modalEditingPhoto, setModalEditingPhoto] = useState<boolean>(false);
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const { mutationFn: updateAvatar } = useMutationAction(UPDATE_USER_AVATAR, {
    refetchQueries: [GET_ONE_USER, 'GetOneUser'],
  });

  const selectPhoto = async () => {
    try {
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4, 3],
        quality: 1,
      });
      if (!photo.canceled) {
        setSelectedPhoto(photo.assets);
        setModalEditingPhoto(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancelEditing = () => {
    setSelectedPhoto([]);
    setModalEditingPhoto(false);
  };

  const uploadPhoto = async () => {
    setLoadingUpload(true);
    try {
      const avatarUri = await uploadImagesCloudinary(selectedPhoto);
      const response = await updateAvatar({
        variables: { avatarUri: avatarUri[0] },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpload(false);
      setModalEditingPhoto(false);
    }
  };

  return (
    <View style={UserAvatarStyles.mainContainer}>
      <View style={UserAvatarStyles.cameraButton}>
        {editable && (
          <RCButton
            onPress={() => selectPhoto()}
            type="primaryButton"
            styles={{ buttonStyles: { padding: 5, borderRadius: 999 } }}
            icon={<Entypo name="camera" size={15} color={MAIN_COLORS.quartery} />}
          />
        )}
      </View>
      <Pressable onPress={() => setModalPhoto(true)}>
        <Image
          style={UserAvatarStyles.avatarImage}
          source={avatarUri ? { uri: avatarUri } : require('../../assets/userprofile.png')}
        />
      </Pressable>
      <Modal animationType="slide" transparent={true} visible={modalPhoto}>
        <View style={UserAvatarStyles.maskModal}>
          <View style={UserAvatarStyles.closeButtonContainer}>
            <RCButton
              onPress={() => setModalPhoto(false)}
              icon={<Ionicons name="close" size={34} color={MAIN_COLORS.quartery} />}
            />
          </View>
          <Image
            style={UserAvatarStyles.imagePerfilContainer}
            source={avatarUri ? { uri: avatarUri } : require('../../assets/userprofile.png')}
          ></Image>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalEditingPhoto}>
        <View style={UserAvatarStyles.maskModalEditing}>
          <View style={UserAvatarStyles.closeContainer}>
            <Text numberOfLines={1} style={[{ color: 'white' }, TYPOGRAPHY_STYLES.subtitle]}>
              Actualizar foto de perfil
            </Text>
            <RCButton
              onPress={() => handleCancelEditing()}
              icon={<Ionicons name="close" size={30} color={MAIN_COLORS.quartery} />}
            />
          </View>
          <View style={UserAvatarStyles.editingImageContainer}>
            <Image
              style={UserAvatarStyles.imagePerfilContainer}
              source={
                selectedPhoto[0]?.uri
                  ? { uri: selectedPhoto[0]?.uri }
                  : require('../../assets/userprofile.png')
              }
            ></Image>
            <View style={UserAvatarStyles.imageSelectedContainer}>
              <MaterialIcons name="public" size={24} color={MAIN_COLORS.quartery} />
              <Text style={{ color: MAIN_COLORS.quartery }}>
                Tu foto de perfil es pública para todos.
              </Text>
            </View>
          </View>
          <View style={UserAvatarStyles.buttonsContainer}>
            <RCButton
              styles={{
                buttonStyles: { paddingHorizontal: 35 },
                textStyles: { color: MAIN_COLORS.primary },
              }}
              onPress={() => handleCancelEditing()}
              text="Cancelar"
            />
            <RCButton
              onPress={() => uploadPhoto()}
              loading={loadingUpload}
              styles={{ buttonStyles: { paddingHorizontal: 35 } }}
              type="primaryButton"
              text="Guardar"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const UserAvatarStyles = StyleSheet.create({
  mainContainer: {
    borderWidth: 2,
    borderRadius: 999,
    position: 'relative',
    borderColor: MAIN_COLORS.primary,
  },
  cameraButton: {
    position: 'absolute',
    zIndex: 2,
    right: -8,
    bottom: 0,
    transform: [{ translateY: -10 }],
  },
  avatarImage: {
    width: 90,
    height: 90,
    borderRadius: 999,
    resizeMode: 'cover',
  },
  maskModal: {
    backgroundColor: MAIN_COLORS.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    flex: 1,
  },
  maskModalEditing: {
    backgroundColor: MAIN_COLORS.tertiary,
    position: 'relative',
    flex: 1,
    gap: 20,
  },
  imageSelectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  imagePerfilContainer: {
    width: 350,
    height: 300,
    resizeMode: 'contain',
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  editingImageContainer: {
    gap: 30,
    alignItems: 'center',
  },
  closeContainer: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    flexDirection: 'row',
    padding: 20,
    width: '100%',
    justifyContent: 'flex-end',
    borderTopColor: 'grey',
    borderTopWidth: 1,
    gap: 10,
  },
});

export default UserAvatar;
