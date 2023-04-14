import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LoginFormTypes, RootStackParamList } from "@interfaces/index";
import { containerStyles, mainColors } from "@helpers/theme";
import { loginFormSchema } from "@yupSchemas/loginFormSchema";
import RCFormikTextInput from "@atoms/RCFormikTextInput";
import RCButton from "@atoms/RCButton";
import RCTextLink from "@atoms/RCTextLink";
import { routes } from "@navigations/index";

const initialValuesLoginForm: LoginFormTypes = {
  email: "",
  password: "",
};

const LoginTemplate = () => {
  const navigation = useNavigation<RootStackParamList>();
  const handleSubmitLogin = (values: LoginFormTypes) => {
    console.log(values);
    navigation.navigate(routes.authRoutes.home.init);
  };
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View
        style={[LoginTemplateStyles.container, containerStyles.mainContainer]}
      >
        <Image
          alt="logo"
          style={LoginTemplateStyles.image}
          source={require("../../assets/logos/logo.png")}
        ></Image>
        <Formik
          initialValues={initialValuesLoginForm}
          onSubmit={handleSubmitLogin}
          validationSchema={loginFormSchema}
        >
          {({ handleSubmit }) => {
            return (
              <View style={LoginTemplateStyles.formContainer}>
                <RCFormikTextInput
                  placeholder="Email"
                  name="email"
                  styles={{ borderColor: mainColors.quartery }}
                />
                <RCFormikTextInput
                  placeholder="Contraseña"
                  name="password"
                  styles={{ borderColor: mainColors.quartery }}
                  secureTextEntry
                />
                <RCButton
                  onPress={() => handleSubmit()}
                  text="Iniciar Sesión"
                  styles={{
                    buttonStyles: {
                      paddingVertical: 15,
                    },
                  }}
                  type="quartery_button"
                />
                <View style={LoginTemplateStyles.separationContainer}>
                  <Text style={LoginTemplateStyles.separatorText}>
                    o continúa con
                  </Text>
                  <View style={LoginTemplateStyles.separator}></View>
                </View>
                <View style={LoginTemplateStyles.authsContainer}>
                  <RCButton
                    text="Iniciar sesión con Google"
                    icon={
                      <Image
                        alt="google_logo"
                        style={LoginTemplateStyles.authIconImage}
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
                    onPress={() =>
                      navigation.navigate(routes.authRoutes.register.init)
                    }
                  />
                </View>
                <View style={{ alignSelf: "center" }}>
                  <RCTextLink
                    text="¿Olvidaste tu contraseña?"
                    onPress={() =>
                      navigation.navigate(routes.authRoutes.register.init)
                    }
                    styles={{
                      textStyles: { fontSize: 12, color: mainColors.quartery },
                    }}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
        <View style={LoginTemplateStyles.registerOption}>
          <Text
            style={{
              fontSize: 12,
            }}
          >
            ¿Eres nuevo?
          </Text>
          <RCTextLink
            text="Registrate"
            styles={{
              textStyles: { fontSize: 12, color: mainColors.quartery },
            }}
            icon={
              <Ionicons
                name="arrow-forward-circle"
                size={16}
                color={mainColors.quartery}
              />
            }
            onPress={() => navigation.navigate(routes.authRoutes.register.init)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const LoginTemplateStyles = StyleSheet.create({
  container: {
    justifyContent: "center", //elementos ubicados en el centro de la altura debido al valor por defecto del flex-direction del componente padre flex:1 el cual es column
    gap: 20, //separación entre los componentes directos hijos
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
  formContainer: {
    gap: 20,
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
  separator: {
    height: 1.5,
    width: "100%",
    top: "50%",
    flex: 1,
    backgroundColor: "grey",
    opacity: 0.3,
    position: "absolute",
  },
  registerOption: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  image: {
    alignSelf: "center",
    width: 400,
    height: 80,
    marginBottom: 20,
    resizeMode: "contain",
  },
});

export default LoginTemplate;
