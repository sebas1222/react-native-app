import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AntDesign } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";


const Layout = () => {

    return(
        <View style={LayoutStyles.container}>
            <View>
                <AntDesign name="menu-fold" size={24} color="black"/>
            </View>
            <View>
                <Text style={[LayoutStyles.textContainer, TYPOGRAPHY_STYLES.subtitle]}>Inicio</Text>
            </View>
            <View>
                <FontAwesome name="user-circle-o" size={24} color="black" />
            </View>
        </View>
    );
};

const LayoutStyles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF", 
        width: "100%", 
        marginTop: "8%", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "4%"
    },
    textContainer: {
        color: MAIN_COLORS.tertiary,
    }
  });

export default Layout;