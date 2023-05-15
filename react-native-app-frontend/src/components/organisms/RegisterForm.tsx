import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, RegisterFormTypes } from '@interfaces/index';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';
import { registerFormSchema } from '@yupSchemas/registerFormSchema';
import RCFormikTextInput from '@atoms/RCFormikTextInput';
import RCButton from '@atoms/RCButton';
import { REGISTER_USER } from '@api/queries';
import { useMutationAction } from '@hooks/useMutationAction';

const initialValuesRegisterForm: RegisterFormTypes = {
  name: '',
  email: '',
  password: '',
  re_password: '',
};

const RegisterForm = () => {
  const navigation = useNavigation<NavigationProps['Login']>();
  const { mutationFn: registerUser, loading, error } = useMutationAction(REGISTER_USER);

  const handleSubmit = async (values: RegisterFormTypes) => {
    console.log(values);
    try {
      await registerUser({
        variables: {
          credentials: {
            name: values.name,
            email: values.email,
            password: values.password,
          },
        },
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={RegisterFormStyles.container}>
      <View style={RegisterFormStyles.titleContainer}>
        <Text
          style={[
            TYPOGRAPHY_STYLES.superTitle,
            {
              color: MAIN_COLORS.primary,
            },
          ]}
        >
          Registrate
        </Text>

        <View style={RegisterFormStyles.circle}></View>
      </View>
      <Text style={RegisterFormStyles.errorMessage}>
        {error && error.graphQLErrors[0].extensions.error}
      </Text>
      <Formik
        onSubmit={handleSubmit}
        validationSchema={registerFormSchema}
        initialValues={initialValuesRegisterForm}
      >
        {({ handleSubmit }) => {
          return (
            <View style={[RegisterFormStyles.formContainer]}>
              <RCFormikTextInput placeholder="Nombre" name="name" />
              <RCFormikTextInput placeholder="Email" name="email" />
              <RCFormikTextInput placeholder="Contraseña" name="password" secureTextEntry />
              <RCFormikTextInput
                placeholder="Confirmar contraseña"
                name="re_password"
                secureTextEntry
              />
              <RCButton
                text="Registrarme"
                loading={loading}
                styles={{
                  buttonStyles: {
                    paddingVertical: 15,
                  },
                }}
                type="tertiaryButton"
                onPress={() => handleSubmit()}
              />
            </View>
          );
        }}
      </Formik>
      <View style={RegisterFormStyles.separationContainer}>
        <Text style={RegisterFormStyles.separatorText}>o registrate con</Text>
        <View style={RegisterFormStyles.separator}></View>
      </View>
      <View style={RegisterFormStyles.authsContainer}>
        <RCButton
          text="Iniciar sesión con Google"
          icon={
            <Image
              alt="google_logo"
              style={RegisterFormStyles.authIconImage}
              source={require('../../assets/logos/google.png')}
            />
          }
          styles={{
            buttonStyles: {
              backgroundColor: 'white',
              padding: 10,
              flexDirection: 'row-reverse',
            },
            textStyles: { color: 'grey' },
          }}
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

const RegisterFormStyles = StyleSheet.create({
  container: {
    gap: 15,
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 2,
    alignItems: 'flex-end',
  },
  formContainer: {
    gap: 10,
  },
  errorMessage: {
    color: MAIN_COLORS.danger,
    textAlign: 'center',
  },
  separationContainer: {
    position: 'relative',
  },
  separatorText: {
    textAlign: 'center',
    backgroundColor: '#f3f3f3',
    alignSelf: 'center',
    color: 'grey',
    fontSize: 12,
    marginBottom: 2,
    paddingHorizontal: 4,
    zIndex: 1,
  },
  circle: {
    width: 15,
    marginBottom: 20,
    height: 15,
    backgroundColor: MAIN_COLORS.primary,
    borderRadius: 999,
  },
  separator: {
    height: 1.5,
    width: '100%',
    top: '50%',
    flex: 1,
    backgroundColor: 'grey',
    opacity: 0.3,
    position: 'absolute',
  },
  authsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  authIconImage: {
    width: 40,
    aspectRatio: 1,
  },
});

export default RegisterForm;
