import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableNativeFeedback,
} from 'react-native';
import React from 'react';
import { BUTTON_STYLES, MAIN_COLORS } from '@helpers/theme';
import { ActivityIndicator } from 'react-native';
import { ButtonStylesTypes } from '@interfaces/index';

interface RCButtonProps {
  text?: string;
  type?: keyof ButtonStylesTypes | null;
  onPress: () => void;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  styles?: { buttonStyles?: ViewStyle; textStyles?: TextStyle };
}

const RCButton = ({
  text = '', //valores por defecto
  type,
  onPress,
  disabled,
  icon,
  loading,
  styles = { buttonStyles: {}, textStyles: {} },
}: RCButtonProps) => {
  return (
    <View
      style={{
        overflow: 'hidden',
        borderRadius:
          styles.buttonStyles?.borderRadius || RCButtonStyles.buttonContainer.borderRadius,
      }}
    >
      <TouchableNativeFeedback
        testID="RCButton_touchable"
        disabled={disabled || false}
        onPress={() => onPress()}
      >
        <View
          style={[
            RCButtonStyles.buttonContainer,
            type && BUTTON_STYLES[type].containerStyle,
            styles.buttonStyles,
          ]}
        >
          {text && (
            <Text
              style={[
                RCButtonStyles.buttonText,
                type && BUTTON_STYLES[type].textStyle,
                styles.textStyles,
              ]}
            >
              {text}
            </Text>
          )}

          {icon && icon}
          {loading && <ActivityIndicator color={MAIN_COLORS.quartery} />}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const RCButtonStyles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 10,
    borderRadius: 8,
    gap: 5,
  },
  buttonText: {
    fontWeight: '700',
    color: MAIN_COLORS.tertiary,
  },
});

export default RCButton;
