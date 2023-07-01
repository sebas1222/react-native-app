import * as ImagePicker from 'expo-image-picker';
import { encode } from 'base-64';
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_UPLOAD_PRESET,
} from '@env';

export const uploadImagesCloudinary = async (
  assets: Array<ImagePicker.ImagePickerAsset>
//): Promise<string[]> => {
  const promises = assets.map((asset) => {
    return new Promise<string>((resolve, reject) => {
      const formData = new FormData();
      formData.append('file', {
        uri: asset.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Basic ${encode(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`)}`,
        },
      })
        .then((response) => response.json())
        .then((data) => resolve(data.secure_url))
        .catch((error) => reject(error));
    });
  });
  try {
    const imagesURIS = await Promise.all(promises);
    return imagesURIS;
  } catch (error) {
    throw Error('Hubo un error al subir las imagenes');
  }
};
