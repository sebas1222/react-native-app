import {
  View,
  Text,
  InteractionManager,
  Image,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
  TouchableNativeFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { encode } from "base-64";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";
import RCButton from "@atoms/RCButton";
import {
  AddRecipeFormTypes,
  Category,
  CategoryTypes,
  NavigationProps,
  RootStackParamList,
} from "@interfaces/index";
import uuid from "react-native-uuid";
import { ScrollView } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import RCTextInput from "@atoms/RCTextInput";
import { useMutation } from "@apollo/client";
import { POST_RECIPE } from "@api/queries";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

interface RecipeTemplateProps {
  categories: Category[];
}

const initialValuesAddRecipeForm: AddRecipeFormTypes = {
  name: "",
  description: "",
  duration: 0,
  category: { id: "", name: "" },
  ingredients: [],
  steps: [],
};

const RecipesTemplate = ({ categories }: RecipeTemplateProps) => {
  const [navigationRender, setNavigationRender] = useState<boolean>(false);
  const route = useRoute<RouteProp<RootStackParamList, "HomeTab">>();
  const navigation = useNavigation<NavigationProps["RecipeDetails"]>();

  const [addRecipeForm, setAddRecipeForm] = useState<AddRecipeFormTypes>(
    initialValuesAddRecipeForm
  );
  const [modalCategories, setModalCategories] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<Array<ImagePicker.ImagePickerAsset>>(
    []
  );
  const [step, setStep] = useState<number>(1);
  const [CreateRecipe, { error }] = useMutation(POST_RECIPE, {
    context: {
      headers: {
        Authorization: `Bearer ${route.params.authToken} `,
      },
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setNavigationRender(true);
    });
  }, []);
  if (!navigationRender) {
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    );
  }
  const handleChange = (
    name: string,
    value: string | CategoryTypes | number
  ) => {
    setAddRecipeForm({
      ...addRecipeForm,
      [name]: value,
    });
  };

  const addIngredient = () => {
    const newIngredient = { name: "", id: JSON.stringify(uuid.v4()) };
    console.log(newIngredient);
    setAddRecipeForm({
      ...addRecipeForm,
      ingredients: [...addRecipeForm.ingredients, newIngredient],
    });
  };
  const removeIngredient = (id: string) => {
    const ingredients = addRecipeForm.ingredients.filter(
      (ingredient) => ingredient.id !== id
    );
    setAddRecipeForm({
      ...addRecipeForm,
      ingredients,
    });
  };
  const handleChangeIngredient = (id: string, value: string) => {
    setAddRecipeForm({
      ...addRecipeForm,
      ingredients: addRecipeForm.ingredients.map((ingredient) =>
        ingredient.id === id ? { ...ingredient, name: value } : ingredient
      ),
    });
  };
  const addStep = () => {
    const newStep = {
      description: "",
      id: JSON.stringify(uuid.v4()),
    };
    console.log(newStep);
    setAddRecipeForm({
      ...addRecipeForm,
      steps: [...addRecipeForm.steps, newStep],
    });
  };
  const removeStep = (id: string) => {
    const steps = addRecipeForm.steps.filter((step) => step.id !== id);
    setAddRecipeForm({
      ...addRecipeForm,
      steps,
    });
  };
  const handleChangeStep = (id: string, value: string) => {
    setAddRecipeForm({
      ...addRecipeForm,
      steps: addRecipeForm.steps.map((step) =>
        step.id === id ? { ...step, description: value } : step
      ),
    });
  };
  const openGallery = async () => {
    // No permissions request is necessary for launching the image library
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        console.log(result);
        setImageUri(result.assets);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const discardImage = (uri: string) => {
    const newImages = imageUri.filter((image) => image.uri !== uri);
    setImageUri(newImages);
  };

  const handleSubmitRecipe = async () => {
    setLoading(true);
    const cloudName = "dco8fbxso";
    const apiKey = "532913952713138";
    const apiSecret = "WF3WkMLheBOLDsSNpiBvVxNukcA";
    const uploadPreset = "ml_default";
    const promises = imageUri.map((imageUri) => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append("file", {
          uri: imageUri.uri,
          name: "image.jpg",
          type: "image/jpeg",
        });
        formData.append("upload_preset", uploadPreset);

        fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Basic ${encode(`${apiKey}:${apiSecret}`)}`,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              reject(data.error);
            } else {
              resolve(data.secure_url);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
    try {
      const imagesURIS = await Promise.all(promises);
      const recipeDataToSend = {
        ...addRecipeForm,
        ingredients: addRecipeForm.ingredients.map(
          (ingredient) => ingredient.name
        ),
        steps: addRecipeForm.steps.map((steps, index) => ({
          description: steps.description,
          step_number: index + 1,
        })),
        category: addRecipeForm.category.id,
        images: imagesURIS,
      };
      console.log(recipeDataToSend);
      const response = await CreateRecipe({
        variables: { info: recipeDataToSend },
      });
      console.log(response.data.createRecipe);
      navigation.navigate("RecipeDetails", {
        recipeData: response.data.createRecipe,
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const verifiedStep = (step: number) => {
    switch (step) {
      case 2:
        if (addRecipeForm.name.trim().length >= 3) {
          return true;
        } else {
          return false;
        }
      case 3:
        if (addRecipeForm.description.trim().length >= 10) {
          return true;
        } else {
          return false;
        }
      case 4:
        if (addRecipeForm.category.id) {
          return true;
        } else {
          return false;
        }
      case 5:
        if (
          addRecipeForm.ingredients.length > 1 &&
          addRecipeForm.ingredients.every(
            (ingredient) => ingredient.name.trim().length > 0
          )
        ) {
          return true;
        } else {
          return false;
        }
      case 6:
        if (
          addRecipeForm.steps.length > 1 &&
          addRecipeForm.steps.every(
            (step) => step.description.trim().length > 0
          ) &&
          addRecipeForm.duration >= 1
        ) {
          return true;
        } else {
          return false;
        }
      default:
        return false;
    }
  };

  return (
    <ScrollView contentContainerStyle={RecipeAddTemplateStyles.container}>
      <View style={RecipeAddTemplateStyles.stepContainer}>
        <Image
          style={RecipeAddTemplateStyles.imageContainer}
          source={require("../../assets/cooking.png")}
        />
        {step > 1 && (
          <View style={RecipeAddTemplateStyles.dotsContainer}>
            {Array(6)
              .fill(0)
              .map((_, index) => {
                return (
                  <View
                    style={[
                      RecipeAddTemplateStyles.dotItem,
                      {
                        backgroundColor:
                          index + 2 === step ? MAIN_COLORS.primary : "white",
                      },
                    ]}
                    key={index}
                  ></View>
                );
              })}
          </View>
        )}
        {step === 1 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.superTitle}>Cooking Time!</Text>
            <RCButton
              icon={<AntDesign name="arrowright" size={24} color="white" />}
              type="primaryButton"
              styles={{
                buttonStyles: { paddingVertical: 12 },
                textStyles: { fontSize: 16 },
              }}
              text="Comenzar"
              onPress={() => setStep(2)}
            />
          </>
        )}
        {step === 2 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>
              ¿Qué receta crearemos hoy?
            </Text>
            <RCTextInput
              placeholder="Mi receta"
              value={addRecipeForm.name}
              onChangeText={(value) => handleChange("name", value)}
            />

            <RCButton
              onPress={() => setStep(3)}
              disabled={addRecipeForm.name.trim().length >= 3 ? false : true}
              icon={
                <AntDesign
                  name="arrowright"
                  size={24}
                  color={
                    addRecipeForm.name.trim().length >= 3
                      ? "white"
                      : MAIN_COLORS.primary
                  }
                />
              }
              type={
                addRecipeForm.name.trim().length >= 3
                  ? "primaryButton"
                  : "primaryButtonInner"
              }
              text="Continuar"
            />
          </>
        )}
        {step === 3 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>
              ¿Como será nuestra receta?
            </Text>
            <RCTextInput
              multiline
              style={{ height: 50 }}
              textAlignVertical="top"
              numberOfLines={3}
              placeholder="Mi receta la mejor del mundo..."
              value={addRecipeForm.description}
              onChangeText={(value) => handleChange("description", value)}
            />
          </>
        )}
        {step === 4 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>La categoría</Text>
            <RCButton
              type="primaryButtonInner"
              icon={
                <Entypo
                  name="chevron-down"
                  size={20}
                  color={MAIN_COLORS.primary}
                />
              }
              text={addRecipeForm.category.name || "Elige una categoría"}
              styles={{ buttonStyles: { paddingVertical: 10 } }}
              onPress={() => setModalCategories(true)}
            />
            <View>
              <Modal
                transparent={true}
                animationType="slide"
                visible={modalCategories}
              >
                <Pressable
                  onPress={() => setModalCategories(false)}
                  style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                ></Pressable>

                <View style={RecipeAddTemplateStyles.selectContainer}>
                  <View style={RecipeAddTemplateStyles.selectTop}>
                    <AntDesign
                      onPress={() => setModalCategories(false)}
                      name="close"
                      size={20}
                      color="grey"
                    />
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      Elige una categoría:
                    </Text>
                  </View>
                  <FlatList
                    data={categories}
                    renderItem={({ item: category }) => (
                      <TouchableNativeFeedback
                        onPress={() =>
                          handleChange("category", {
                            id: category.id,
                            name: category.name,
                          })
                        }
                      >
                        <View
                          style={
                            RecipeAddTemplateStyles.categoryOptionContainer
                          }
                        >
                          <Text
                            style={RecipeAddTemplateStyles.categoryOptionText}
                          >
                            {category.name}
                          </Text>
                          {addRecipeForm.category.id === category.id && (
                            <Feather
                              name="check"
                              size={20}
                              color={MAIN_COLORS.primary}
                            />
                          )}
                        </View>
                      </TouchableNativeFeedback>
                    )}
                  ></FlatList>
                </View>
              </Modal>
            </View>
          </>
        )}
        {step === 5 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>Los ingredientes</Text>
            <RCButton
              type="primaryButton"
              text="Añade un ingrediente +"
              styles={{ buttonStyles: { alignSelf: "center" } }}
              onPress={() => addIngredient()}
            />
            <ScrollView
              nestedScrollEnabled={true}
              style={{ maxHeight: 100 }}
              contentContainerStyle={
                RecipeAddTemplateStyles.ingredientsContainer
              }
            >
              {addRecipeForm.ingredients &&
                addRecipeForm.ingredients.map((ingredient, index) => {
                  return (
                    <RCTextInput
                      key={ingredient.id}
                      placeholder={`Ingrediente ${index + 1}`}
                      value={ingredient.name}
                      onChangeText={(value) =>
                        handleChangeIngredient(ingredient.id, value)
                      }
                      icon={
                        <AntDesign
                          name="closecircle"
                          size={24}
                          onPress={() => removeIngredient(ingredient.id)}
                          color={MAIN_COLORS.danger}
                        />
                      }
                    />
                  );
                })}
            </ScrollView>
          </>
        )}
        {step === 6 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>¡Dime los pasos!</Text>
            <RCButton
              type="primaryButton"
              text="Añade un paso +"
              styles={{ buttonStyles: { alignSelf: "center" } }}
              onPress={() => addStep()}
            />
            <ScrollView
              nestedScrollEnabled={true}
              style={{ maxHeight: 100 }}
              contentContainerStyle={
                RecipeAddTemplateStyles.ingredientsContainer
              }
            >
              {addRecipeForm.steps &&
                addRecipeForm.steps.map((step, index) => {
                  return (
                    <RCTextInput
                      key={step.id}
                      value={step.description}
                      placeholder={`Paso ${index + 1}`}
                      onChangeText={(value) => handleChangeStep(step.id, value)}
                      icon={
                        <AntDesign
                          name="closecircle"
                          size={24}
                          onPress={() => removeStep(step.id)}
                          color={MAIN_COLORS.danger}
                        />
                      }
                    />
                  );
                })}
            </ScrollView>
            <Text style={{ color: "grey", fontWeight: "700" }}>
              Duracion (en mins):
            </Text>
            <RCTextInput
              value={String(addRecipeForm.duration)}
              keyboardType="numeric"
              onChangeText={(value) => handleChange("duration", Number(value))}
            />
          </>
        )}
        {step === 7 && (
          <>
            <Text style={TYPOGRAPHY_STYLES.megaTitle}>Elige unas fotos!</Text>
            <RCButton
              icon={<Feather name="camera" size={24} color="white" />}
              type="primaryButton"
              text="Seleccionar fotos"
              onPress={() => openGallery()}
            />
            <ScrollView contentContainerStyle={{ gap: 10 }} horizontal>
              {imageUri &&
                imageUri.map((image, index) => {
                  return (
                    <View key={index} style={{ position: "relative" }}>
                      <TouchableNativeFeedback
                        onPress={() => discardImage(image.uri)}
                      >
                        <View
                          style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                            backgroundColor: MAIN_COLORS.danger,
                            padding: 8,
                            borderBottomLeftRadius: 5,
                            zIndex: 1,
                          }}
                        >
                          <AntDesign name="close" size={16} color="white" />
                        </View>
                      </TouchableNativeFeedback>

                      <Image
                        style={{ height: 100, width: 100 }}
                        source={{ uri: image.uri }}
                      />
                    </View>
                  );
                })}
            </ScrollView>
          </>
        )}
        {step > 2 && (
          <View style={RecipeAddTemplateStyles.buttonsContainer}>
            <RCButton
              onPress={() => setStep(step - 1)}
              type="primaryButton"
              text="Regresar"
              styles={{ buttonStyles: { flexDirection: "row-reverse" } }}
              icon={<AntDesign name="arrowleft" size={24} color="white" />}
            ></RCButton>
            {step === 7 ? (
              <RCButton
                type={
                  imageUri.length >= 1 ? "primaryButton" : "primaryButtonInner"
                }
                text="Crear receta"
                disabled={imageUri.length >= 1 ? false : true}
                onPress={() => handleSubmitRecipe()}
                loading={loading}
                icon={
                  <MaterialCommunityIcons
                    name="food-turkey"
                    size={24}
                    color={imageUri.length >= 1 ? "white" : MAIN_COLORS.primary}
                  />
                }
              />
            ) : (
              <RCButton
                onPress={() => setStep(step + 1)}
                disabled={verifiedStep(step) ? false : true}
                icon={
                  <AntDesign
                    name="arrowright"
                    size={24}
                    color={verifiedStep(step) ? "white" : MAIN_COLORS.primary}
                  />
                }
                type={
                  verifiedStep(step) ? "primaryButton" : "primaryButtonInner"
                }
                text="Continuar"
              />
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const RecipeAddTemplateStyles = StyleSheet.create({
  container: {
    padding: 20,
    flexGrow: 1, //para que haga efecto el justify content y ocupa siempre el scroll de toda la pantalla
    justifyContent: "center",
  },
  imageContainer: {
    width: "100%",
    height: 250,
  },
  dotsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    gap: 5,
  },
  dotItem: {
    width: 10,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: MAIN_COLORS.primary,
    borderRadius: 999,
  },
  stepContainer: {
    gap: 20,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
  },
  selectContainer: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 200,
    right: 0,
  },
  selectTop: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  categoryOptionContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f1f1",
  },
  categoryOptionText: {
    flex: 1,
  },
  ingredientsContainer: {
    gap: 10,
    flexGrow: 1,
  },

  buttonsContainer: {
    flexDirection: "row",

    justifyContent: "space-between",
  },
});

export default RecipesTemplate;
