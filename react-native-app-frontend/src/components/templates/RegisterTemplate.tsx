import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { RegisterFormTypes, RootStackParamList } from "@interfaces/index";
import { containerStyles, mainColors, typographyStyles } from "@helpers/theme";
import { registerFormSchema } from "@yupSchemas/registerFormSchema";
import RCFormikTextInput from "@atoms/RCFormikTextInput";
import RCButton from "@atoms/RCButton";
import { routes } from "@navigations/index";

const initialValuesRegisterForm: RegisterFormTypes = {
  name: "",
  email: "",
  password: "",
  re_password: "",
};

const RegisterTemplate = () => {
  const navigation = useNavigation<RootStackParamList>();

  const handleSubmit = (values: RegisterFormTypes) => {
    console.log(values);
  };
  return (
    <ScrollView>
      <View
        style={[
          containerStyles.mainContainer,
          RegisterTemplateStyles.container,
        ]}
      >
        <View style={RegisterTemplateStyles.titleContainer}>
          <Text
            style={[
              typographyStyles.superTitle,
              {
                color: mainColors.quartery,
              },
            ]}
          >
            Registrate
          </Text>
          <View style={RegisterTemplateStyles.circle}></View>
        </View>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={registerFormSchema}
          initialValues={initialValuesRegisterForm}
        >
          {({ handleSubmit }) => {
            return (
              <View style={[RegisterTemplateStyles.formContainer]}>
                <RCFormikTextInput placeholder="Nombre" name="name" />
                <RCFormikTextInput placeholder="Email" name="email" />
                <RCFormikTextInput placeholder="Contraseña" name="password" />
                <RCFormikTextInput
                  placeholder="Confirmar contraseña"
                  name="re_password"
                />
                <RCButton
                  text="Registrarme"
                  styles={{
                    buttonStyles: {
                      paddingVertical: 15,
                    },
                  }}
                  type="quartery_button"
                  onPress={() => handleSubmit()}
                />
              </View>
            );
          }}
        </Formik>
        <View style={RegisterTemplateStyles.separationContainer}>
          <Text style={RegisterTemplateStyles.separatorText}>
            o registrate con
          </Text>
          <View style={RegisterTemplateStyles.separator}></View>
        </View>
        <View style={RegisterTemplateStyles.authsContainer}>
          <RCButton
            text="Iniciar sesión con Google"
            icon={
              <Image
                alt="google_logo"
                style={RegisterTemplateStyles.authIconImage}
                source={require("../../assets/logos/google.png")}
              />
            }
            styles={{
              buttonStyles: {
                backgroundColor: "white",
                flexDirection: "row-reverse",
              },
              textStyles: { color: "grey" },
            }}
            onPress={() => navigation.navigate(routes.authRoutes.register.init)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const RegisterTemplateStyles = StyleSheet.create({
  container: {
    gap: 15,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 2,
    alignItems: "flex-end",
  },
  formContainer: {
    gap: 10,
  },
  separationContainer: {
    position: "relative",
  },
  separatorText: {
    textAlign: "center",
    backgroundColor: "#f3f3f3",
    alignSelf: "center",
    color: "grey",
    fontSize: 12,
    marginBottom: 2,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  circle: {
    width: 15,
    marginBottom: 20,
    height: 15,
    backgroundColor: mainColors.quartery,
    borderRadius: 999,
  },
  separator: {
    height: 1.5,
    width: "100%",
    top: "50%",
    flex: 1,
    backgroundColor: "grey",
    opacity: 0.3,
    position: "absolute",
  },
  authsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  authIconImage: {
    width: 40,
    aspectRatio: 1,
  },
});

export default RegisterTemplate;
