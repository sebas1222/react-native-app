import React, { useEffect, useState } from "react";
import RecipeDetailsTemplate from "@templates/RecipeDetailsTemplate";

const RecipeDetails = ({ route, navigation }: any) => {
  const {recipeId} = route.params;
  const [item, setItem] = useState({});

  useEffect( () => {
    switch(recipeId){
      case 1:
        setItem({
          name: "Hamburguesa",
          description: "Hamburguesa Angus cubierta con queso mozzarella y cheddar, con jalapeños y tiritas de cebolla crujiente, bañadas con aderezo ranch. Servida en pan Kaiser tostado con lechuga y tomates.",
          time: "20 Min",
          image: require("../../assets/Hamburguesa.png")
        })
        break;
      case 2:
        setItem({
          name: "Healthy Taco Salad",
          description: "Lorem ipsum dolor sit amet consectetur adipisicing elit Dignissimos veritatis totam voluptates dolorem enim eveniet iusto illo rerum fuga.",
          time: "15 Min",
          image: ""
        })
        break;
      default:
        setItem({
          name: "Comida",
          description: "",
          time: "15 Min",
          image: ""
        })
        break
    }
  }, [recipeId]);

  return <RecipeDetailsTemplate 
    item={item} />;
};

export default RecipeDetails;
