import "react-native-gesture-handler";
import AuthNavigator from "@navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}
