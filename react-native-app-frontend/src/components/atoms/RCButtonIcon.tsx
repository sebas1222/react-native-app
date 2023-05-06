import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { MAIN_COLORS } from "@helpers/theme";
import { StyleSheet, Text, TouchableNativeFeedback, View, Image } from "react-native";


const RCButtonIcon = (props: any) => {
    const {icon, onPress} = props;
    return(
    <View
    >
        <View
            style={[RCButtonIconStyles.buttonText]}
        >
          <AntDesign name="caretright" size={24} color={MAIN_COLORS.primary} />
        </View>
    </View>        
    );
};

const RCButtonIconStyles = StyleSheet.create({
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 8,
      borderRadius: 8,
      gap: 2,
    },
    buttonText: {
      //height: 100%
    },
  });


export default RCButtonIcon;