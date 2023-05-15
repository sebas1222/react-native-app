import React, { useState } from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Image, FlatList, Text } from 'react-native';
import { AntDesign, Entypo, Feather } from '@expo/vector-icons';
import RCButton from '@atoms/RCButton';
import RCTextInput from '@atoms/RCTextInput';
import { MAIN_COLORS } from '@helpers/theme';
import { AddRecipeFormTypes, CategoryTypes, NavigationProps } from '@interfaces/index';
import ProcessStep from '@molecules/ProcessStep';
import SelectContainer from '@molecules/SelectContainer';
import TextInputList from '@molecules/TextInputList';
import { uploadImagesCloudinary } from '@helpers/cloudinary';
import { POST_RECIPE } from '@api/queries';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useMutationAction } from '@hooks/useMutationAction';

const initialValuesAddRecipeForm: AddRecipeFormTypes = {
  name: '',
  description: '',
  duration: 0,
  category: { id: '', name: '' },
  images: [],
  ingredients: [],
  steps: [],
};
interface AddRecipeProcessProps {
  categories: CategoryTypes[];
}
const AddRecipeProcess = ({ categories }: AddRecipeProcessProps) => {
  const [step, setStep] = useState<number>(1);
  const [addRecipeForm, setAddRecipeForm] = useState<AddRecipeFormTypes>(
    initialValuesAddRecipeForm
  );
  const [loadingSubmitRecipe, setLoadingSubmitRecipe] = useState<boolean>(false);
  const [modalCategories, setModalCategories] = useState<boolean>(false);
  const { mutationFn: createRecipe } = useMutationAction(POST_RECIPE);
  const navigation = useNavigation<NavigationProps['RecipeDetails']>();

  const handleChangeForm = (
    name: keyof AddRecipeFormTypes,
    value: AddRecipeFormTypes[keyof AddRecipeFormTypes]
  ) => {
    setAddRecipeForm({ ...addRecipeForm, [name]: value });
  };

  const selectPhotos = async () => {
    //No pedira permisos
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        handleChangeForm('images', result.assets);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitCreateRecipe = async () => {
    setLoadingSubmitRecipe(true);
    try {
      const imagesURIS = await uploadImagesCloudinary(addRecipeForm.images);
      const recipeDataToSend = {
        ...addRecipeForm,
        ingredients: addRecipeForm.ingredients.map((ingredient) => ingredient.name),
        steps: addRecipeForm.steps.map((step, index) => ({
          description: step.description,
          step_number: index + 1,
        })),
        category: addRecipeForm.category.id,
        images: imagesURIS,
      };
      const response = await createRecipe({
        variables: { info: recipeDataToSend },
      });
      navigation.navigate('RecipeDetails', {
        recipeId: response.data.createRecipe.id,
      });
      setLoadingSubmitRecipe(false);
      setStep(1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      {step === 1 && (
        <ProcessStep
          image=""
          title="Cooking Time!"
          validationOnNext={true}
          onPressNext={() => setStep(step + 1)}
        />
      )}
      {step === 2 && (
        <ProcessStep
          title="¿Qué receta crearemos hoy?"
          validationOnNext={addRecipeForm.name.trim().length >= 3}
          onPressNext={() => setStep(step + 1)}
        >
          <RCTextInput
            placeholder="Mi receta"
            value={addRecipeForm.name}
            onChangeText={(value) => handleChangeForm('name', value)}
          />
        </ProcessStep>
      )}
      {step === 3 && (
        <ProcessStep
          title="¿Cómo sera nuestra receta?"
          validationOnNext={addRecipeForm.description.trim().length >= 10}
          onPressNext={() => setStep(step + 1)}
          onPressBack={() => setStep(step - 1)}
        >
          <RCTextInput
            multiline
            style={{ height: 50 }}
            textAlignVertical="top"
            numberOfLines={3}
            placeholder="Mi receta la mejor del mundo..."
            value={addRecipeForm.description}
            onChangeText={(value) => handleChangeForm('description', value)}
          />
        </ProcessStep>
      )}
      {step === 4 && (
        <ProcessStep
          title="La categoría"
          validationOnNext={!!addRecipeForm.category.id}
          onPressNext={() => setStep(step + 1)}
          onPressBack={() => setStep(step - 1)}
        >
          <RCButton
            type="primaryButtonInner"
            icon={<Entypo name="chevron-down" size={20} color={MAIN_COLORS.primary} />}
            text={addRecipeForm.category.name || 'Elige una categoría'}
            styles={{ buttonStyles: { paddingVertical: 10 } }}
            onPress={() => setModalCategories(true)}
          />
          <SelectContainer
            data={categories?.map((category) => ({
              id: category.id,
              value: category.name,
              valueLabel: category.name,
            }))}
            value={addRecipeForm.category?.name}
            handleChangeData={(value) =>
              handleChangeForm('category', {
                id: categories?.filter((category) => category?.name === value)[0]?.id,
                name: value,
              })
            }
            title="Elige una categoría:"
            visible={modalCategories}
            onClose={() => setModalCategories(false)}
          />
        </ProcessStep>
      )}
      {step === 5 && (
        <ProcessStep
          validationOnNext={
            addRecipeForm.ingredients.length > 1 &&
            addRecipeForm.ingredients.every((ingredient) => ingredient.name?.trim().length > 0)
          }
          title="Los ingredientes"
          onPressNext={() => setStep(step + 1)}
          onPressBack={() => setStep(step - 1)}
        >
          <TextInputList
            buttonAddText="Añade un ingrediente +"
            placeholder="Ingrediente"
            textInputData={addRecipeForm.ingredients.map((ingredient) => ({
              id: ingredient.id,
              value: ingredient.name,
            }))}
            handleChangeData={(data) =>
              handleChangeForm(
                'ingredients',
                data.map((dataItem) => ({
                  id: dataItem.id,
                  name: dataItem.value,
                }))
              )
            }
          />
        </ProcessStep>
      )}
      {step === 6 && (
        <ProcessStep
          validationOnNext={
            addRecipeForm.steps.length > 1 &&
            addRecipeForm.steps.every((step) => step.description?.trim().length > 0) &&
            addRecipeForm.duration >= 1
          }
          title="Los pasos"
          onPressNext={() => setStep(step + 1)}
          onPressBack={() => setStep(step - 1)}
        >
          <TextInputList
            buttonAddText="Agrega un paso +"
            placeholder="Paso"
            textInputData={addRecipeForm.steps.map((step) => ({
              id: step.id,
              value: step.description,
            }))}
            handleChangeData={(data) =>
              handleChangeForm(
                'steps',
                data.map((dataItem) => ({
                  id: dataItem.id,
                  description: dataItem.value,
                }))
              )
            }
          />
          <Text style={{ color: 'grey' }}>Duración (en mins)</Text>
          <RCTextInput
            value={String(addRecipeForm.duration)}
            keyboardType="numeric"
            onChangeText={(value) => handleChangeForm('duration', Number(value))}
          />
        </ProcessStep>
      )}
      {step === 7 && (
        <ProcessStep
          validationOnNext={addRecipeForm.images?.length >= 1}
          onPressSubmit={() => handleSubmitCreateRecipe()}
          loadingSubmit={loadingSubmitRecipe}
          onPressBack={() => setStep(step - 1)}
          title="Elige unas fotos!"
        >
          <RCButton
            icon={<Feather name="camera" size={24} color="white" />}
            type="primaryButton"
            text="Seleccionar fotos"
            onPress={() => selectPhotos()}
          />
          <FlatList
            data={addRecipeForm.images}
            horizontal
            nestedScrollEnabled={true}
            renderItem={({ item: image }) => (
              <View style={{ position: 'relative' }}>
                <TouchableNativeFeedback
                  onPress={() =>
                    handleChangeForm(
                      'images',
                      addRecipeForm.images.filter((imageElement) => imageElement.uri !== image.uri)
                    )
                  }
                >
                  <View style={AddRecipeProcessStyles.imageCancelAsset}>
                    <AntDesign name="close" size={16} color="white" />
                  </View>
                </TouchableNativeFeedback>
                <Image style={AddRecipeProcessStyles.imageAsset} source={{ uri: image.uri }} />
              </View>
            )}
          ></FlatList>
        </ProcessStep>
      )}
    </View>
  );
};
const AddRecipeProcessStyles = StyleSheet.create({
  dotsContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
  },
  dotItem: {
    width: 10,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: MAIN_COLORS.primary,
    borderRadius: 999,
  },
  imageCancelAsset: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: MAIN_COLORS.danger,
    padding: 8,
    borderBottomLeftRadius: 5,
    zIndex: 1,
  },
  imageAsset: { height: 100, width: 100 },
});
export default AddRecipeProcess;
