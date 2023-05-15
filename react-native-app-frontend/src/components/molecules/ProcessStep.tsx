import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import RCButton from '@atoms/RCButton';
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from '@helpers/theme';

interface ProcessStepProps {
  image?: string;
  title: string;
  validationOnNext: boolean;
  onPressSubmit?: () => void;
  loadingSubmit?: boolean;
  onPressBack?: () => void;
  onPressNext?: () => void;
  children?: React.ReactNode;
}

const ProcessStep = ({
  image,
  title,
  validationOnNext,
  onPressSubmit,
  loadingSubmit,
  onPressBack,
  onPressNext,
  children,
}: ProcessStepProps) => {
  return (
    <View style={ProcessStepStyles.stepContainer}>
      <Image
        source={require('../../assets/cooking.png')}
        style={ProcessStepStyles.imageContainer}
      />
      <Text style={TYPOGRAPHY_STYLES.megaTitle}>{title}</Text>
      {children}
      <View
        style={[
          ProcessStepStyles.buttonsContainer,
          { flexDirection: onPressBack ? 'row' : 'column' },
        ]}
      >
        {onPressBack && (
          <RCButton
            onPress={() => onPressBack()}
            type="primaryButton"
            text="Regresar"
            styles={{ buttonStyles: { flexDirection: 'row-reverse' } }}
            icon={<AntDesign name="arrowleft" size={18} color="white" />}
          ></RCButton>
        )}
        {onPressNext && (
          <RCButton
            onPress={() => onPressNext()}
            disabled={validationOnNext ? false : true}
            icon={
              <AntDesign
                name="arrowright"
                size={18}
                color={validationOnNext ? 'white' : MAIN_COLORS.primary}
              />
            }
            type={validationOnNext ? 'primaryButton' : 'primaryButtonInner'}
            text="Continuar"
          />
        )}
        {onPressSubmit && (
          <RCButton
            onPress={() => onPressSubmit()}
            icon={
              <Feather
                name="check"
                size={18}
                color={validationOnNext ? 'white' : MAIN_COLORS.primary}
              />
            }
            loading={loadingSubmit}
            disabled={validationOnNext ? false : true}
            type={validationOnNext ? 'primaryButton' : 'primaryButtonInner'}
            text="Terminar"
          />
        )}
      </View>
    </View>
  );
};

const ProcessStepStyles = StyleSheet.create({
  stepContainer: {
    gap: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
  },
  imageContainer: {
    width: '100%',
    height: 250,
  },
  buttonsContainer: {
    justifyContent: 'space-between',
  },
});

export default ProcessStep;
