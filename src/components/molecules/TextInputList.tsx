import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { TextInputListItemTypes } from '@interfaces/index';
import uuid from 'react-native-uuid';
import RCTextInput from '@atoms/RCTextInput';
import { AntDesign } from '@expo/vector-icons';
import { MAIN_COLORS } from '@helpers/theme';
import RCButton from '@atoms/RCButton';

interface TextInputListProps {
  textInputData: TextInputListItemTypes[];
  handleChangeData: (data: TextInputListItemTypes[]) => void;
  placeholder: string;
  buttonAddText: string;
}

const TextInputList = ({
  textInputData,
  handleChangeData,
  buttonAddText,
  placeholder,
}: TextInputListProps) => {
  const [dataInputs, setDataInputs] = useState<TextInputListItemTypes[]>(textInputData);
  console.log({ dataInputs });

  const onAddTextInput = () => {
    const newTextInput = {
      id: JSON.stringify(uuid.v4()),
      value: '',
    };
    updateTextInputList([...dataInputs, newTextInput]);
  };
  const onDeleteTextInput = (idInput: string) => {
    const updatedTextInputs = dataInputs.filter((dataInput) => dataInput.id !== idInput);
    updateTextInputList(updatedTextInputs);
  };

  const onChangeTextInput = (idInput: string, value: string) => {
    const updatedTextInputs = dataInputs.map((dataInput) =>
      dataInput.id === idInput ? { ...dataInput, value } : dataInput
    );
    updateTextInputList(updatedTextInputs);
  };

  const updateTextInputList = (textInputs: TextInputListItemTypes[]) => {
    setDataInputs(textInputs);
    handleChangeData(textInputs);
  };

  return (
    <View style={{ gap: 15 }}>
      <RCButton
        type="primaryButton"
        text={buttonAddText || ''}
        styles={{ buttonStyles: { alignSelf: 'center' } }}
        onPress={() => onAddTextInput()}
      />
      <ScrollView
        nestedScrollEnabled={true}
        style={TextInputListStyles.container}
        contentContainerStyle={TextInputListStyles.contentContainer}
      >
        {dataInputs &&
          dataInputs?.map((textInputItem, index) => {
            return (
              <RCTextInput
                key={textInputItem?.id}
                value={textInputItem?.value}
                placeholder={`${placeholder} ${index + 1}`}
                onChangeText={(value) => onChangeTextInput(textInputItem?.id, value)}
                icon={
                  <AntDesign
                    name="closecircle"
                    size={24}
                    onPress={() => onDeleteTextInput(textInputItem?.id)}
                    color={MAIN_COLORS.danger}
                  />
                }
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const TextInputListStyles = StyleSheet.create({
  container: {
    maxHeight: 100,
  },
  contentContainer: {
    gap: 10,
    flexGrow: 1,
  },
});

export default TextInputList;
