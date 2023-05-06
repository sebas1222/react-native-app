import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LoginFormTypes, NavigationProps } from "@interfaces/index";
import { CONTAINER_STYLES, MAIN_COLORS } from "@helpers/theme";
import { loginFormSchema } from "@yupSchemas/loginFormSchema";
import RCFormikTextInput from "@atoms/RCFormikTextInput";
import RCButton from "@atoms/RCButton";
import RCTextLink from "@atoms/RCTextLink";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../api/queries";

const initialValuesLoginForm: LoginFormTypes = {
  email: "",
  password: "",
};

const LoginTemplate = () => {
  const navigation = useNavigation<NavigationProps["Home"]>();
  const [LoginUser, { loading, error }] = useMutation(LOGIN_USER);

  const handleSubmitLogin = async (values: LoginFormTypes) => {
    try {
      const result = await LoginUser({ variables: { credentials: values } });
      const token = result.data.loginUser.value;
      navigation.navigate("Home", { authToken: token });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={[
            LoginTemplateStyles.container,
            CONTAINER_STYLES.mainContainer,
          ]}
        >
          <Image
            alt="logo"
            style={LoginTemplateStyles.image}
            source={require("../../assets/logos/logo.png")}
          ></Image>
          <Text style={LoginTemplateStyles.errorMessage}>
            {error && error.graphQLErrors[0].extensions.error}
          </Text>
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
                    styles={{ borderColor: MAIN_COLORS.secondary }}
                  />
                  <RCFormikTextInput
                    placeholder="Contraseña"
                    name="password"
                    styles={{ borderColor: MAIN_COLORS.secondary }}
                    secureTextEntry
                  />
                  <RCButton
                    onPress={() => handleSubmit()}
                    text="Iniciar Sesión"
                    loading={loading}
                    styles={{
                      buttonStyles: {
                        paddingVertical: 15,
                      },
                    }}
                    type="tertiaryButton"
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
                      onPress={() => navigation.navigate("Register")}
                    />
                  </View>
                  <View style={{ alignSelf: "center" }}>
                    <RCTextLink
                      text="¿Olvidaste tu contraseña?"
                      onPress={() => navigation.navigate("Register")}
                      styles={{
                        textStyles: {
                          fontSize: 12,
                          fontWeight: "bold",
                        },
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
                textStyles: { fontSize: 12 },
              }}
              icon={
                <Ionicons
                  name="arrow-forward-circle"
                  size={16}
                  color={MAIN_COLORS.primary}
                />
              }
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  errorMessage: {
    color: MAIN_COLORS.danger,
    textAlign: "center",
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
