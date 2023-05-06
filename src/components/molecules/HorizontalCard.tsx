import React, { useState } from 'react';
import RCButton from "@atoms/RCButton";
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";
import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from "react-native";
import RCButtonIcon from '@atoms/RCButtonIcon';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, Recipe } from '@interfaces/index';


const HorizontalCard = (props: any) => {
    const {styles, action, icon, buttonText, buttonType, toAction, foodName,
        foodType, autor} = props;
    const navigation = useNavigation<NavigationProps["RecipeDetails"]>();
    const [data, setData] = useState<Recipe>({
        id: "",
        author: {
          id: "",
          name: "",
        },
        name: "Hamburguesa",
        description: "Hamburguesa Angus cubierta con queso mozzarella y cheddar, con jalapeños y tiritas de cebolla crujiente, bañadas con aderezo ranch. Servida en pan Kaiser tostado con lechuga y tomates.",
        category: {
          id: "",
          name: "Fritura",
        },
        duration: 20,
        ingredients: [""],
        steps: [{
            description: "",
            step_number: 10,
          }],
        images: [],
        image: require('../../assets/Hamburguesa.png'),
        likes: [{
            id: "",
            name: "Juan Perez",
          }],
    });
    return(
        <TouchableNativeFeedback
        onPress={() => navigation.navigate("RecipeDetails", { recipeData: data })}
      >
        <View
        style={[HorizontalCardStyles.container]}
        >
            <View
                style={[
                    HorizontalCardStyles.iconContainer,
                ]}
            >
                {icon}
            </View>    
            <View style={HorizontalCardStyles.textContainer}>
                    <Text
                        style={[TYPOGRAPHY_STYLES.subtitle,]}
                    >
                        {foodName}
                    </Text>
                    <Text>
                        {foodType}
                    </Text>
                    <Text>
                        {autor}
                    </Text>
            </View>
            <View style={HorizontalCardStyles.buttonIcon}>
                <RCButtonIcon/>
            </View>
        </View>
      </TouchableNativeFeedback>
    );
};

const HorizontalCardStyles =  StyleSheet.create({
    container: {
        padding: 20,
        gap: 15,
        borderRadius: 10,
        //backgroundColor: MAIN_COLORS.tertiary,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      textContainer: {
        color: "black",
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'left'
      },
      iconContainer: {
        alignSelf: "center",
        display: "flex"
      },
    buttonIcon: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default  HorizontalCard;