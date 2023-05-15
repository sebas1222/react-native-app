import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableNativeFeedback,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import { AntDesign, Feather } from '@expo/vector-icons';
import { MAIN_COLORS } from '@helpers/theme';
import { SelectDataTypes } from '@interfaces/index';

interface SelectContainerProps {
  data: SelectDataTypes[];
  visible: boolean;
  title: string;
  onClose: () => void;
  handleChangeData: (value: string) => void;
  value: string;
}

const SelectContainer = ({
  data,
  visible,
  title,
  onClose,
  handleChangeData,
  value,
}: SelectContainerProps) => {
  const handleChangeOption = (value: string) => {
    handleChangeData(value);
  };

  return (
    <View>
      <Modal transparent={true} animationType="slide" visible={visible}>
        <Pressable
          onPress={() => onClose()}
          style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        ></Pressable>

        <View style={SelectContainerStyles.selectContainer}>
          <View style={SelectContainerStyles.selectTop}>
            <AntDesign onPress={() => onClose()} name="close" size={20} color="grey" />
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
          </View>
          <FlatList
            data={data}
            renderItem={({ item: dataItem }) => (
              <TouchableNativeFeedback onPress={() => handleChangeOption(dataItem.value)}>
                <View style={SelectContainerStyles.selectOptionContainer}>
                  <Text style={SelectContainerStyles.selectOptionText}>{dataItem.valueLabel}</Text>
                  {value === dataItem.value && (
                    <Feather name="check" size={20} color={MAIN_COLORS.primary} />
                  )}
                </View>
              </TouchableNativeFeedback>
            )}
          ></FlatList>
        </View>
      </Modal>
    </View>
  );
};

const SelectContainerStyles = StyleSheet.create({
  selectContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 200,
    right: 0,
  },
  selectTop: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  selectOptionContainer: {
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  selectOptionText: {
    flex: 1,
  },
});

export default SelectContainer;
