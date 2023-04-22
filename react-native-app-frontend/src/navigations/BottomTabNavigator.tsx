import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, Ionicons } from "@expo/vector-icons";
import { MAIN_COLORS } from "@helpers/theme";
import Home from "@screens/Home";
import RCCustomTab from "@atoms/RCCustomTab";
import Recipes from "@screens/Recipes";
import Search from "@screens/Search";
import { RootStackParamList } from "@interfaces/index";

const Tab = createBottomTabNavigator<RootStackParamList>();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { alignItems: "center" },
        headerShown: false,
      }}
      initialRouteName={"HomeTab"}
    >
      {/* <Tab.Screen name="HomeTab" component={Home} />
      <Tab.Screen name="Recipes" component={Recipes} />
      <Tab.Screen name="Search" component={Search} /> */}
      <Tab.Screen
        name={"HomeTab"}
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
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />

      <Tab.Screen
        name={"Recipes"}
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
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
                  }
                />
              }
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name={"Search"}
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
                      ? MAIN_COLORS.quartery
                      : MAIN_COLORS.tertiary
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
