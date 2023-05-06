import React from 'react';
import RCButton from "@atoms/RCButton";
import { MAIN_COLORS, TYPOGRAPHY_STYLES } from "@helpers/theme";
import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from "react-native";
import RCButtonIcon from '@atoms/RCButtonIcon';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '@interfaces/index';


const HorizontalCard = (props: any) => {
    const {styles, action, icon, buttonText, buttonType, toAction, foodName,
        foodType, autor} = props;
    const navigation = useNavigation<NavigationProps["RecipeDetails"]>();
    return(
        <TouchableNativeFeedback
        onPress={() => navigation.navigate("RecipeDetails", { recipeId: 1 })}
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