import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { routes } from ".";
import { mainColors } from "@helpers/theme";
import Home from "@screens/Home";
import RCCustomTab from "@atoms/RCCustomTab";
import Recipes from "@screens/Recipes";
import Search from "@screens/Search";

const Tab = createBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { alignItems: "center" },
      }}
      initialRouteName={routes.homeRoutes.homeTab.init}
    >
      {/* <Tab.Screen name={routes.homeRoutes.homeTab.label} component={Home} />
      <Tab.Screen name={routes.homeRoutes.recipes.label} component={Recipes} /> */}

      <Tab.Screen
        name={routes.homeRoutes.homeTab.label}
        component={Home}
        options={{
          tabBarButton: (props) => (
            <RCCustomTab
              icon={
                <Ionicons
                  name="home-outline"
                  style={{ marginBottom: 4 }}
                  size={22}
                  color={
                    props.accessibilityState?.selected
                      ? "white"
                      : mainColors.quartery
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.homeRoutes.recipes.label}
        component={Recipes}
        options={{
          tabBarButton: (props) => (
            <RCCustomTab
              icon={
                <Ionicons
                  name="book-outline"
                  style={{ marginBottom: 4 }}
                  size={22}
                  color={
                    props.accessibilityState?.selected
                      ? "white"
                      : mainColors.quartery
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.homeRoutes.search.label}
        component={Search}
        options={{
          tabBarButton: (props) => (
            <RCCustomTab
              icon={
                <Feather
                  name="search"
                  size={22}
                  style={{ marginBottom: 4 }}
                  color={
                    props.accessibilityState?.selected
                      ? "white"
                      : mainColors.quartery
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
