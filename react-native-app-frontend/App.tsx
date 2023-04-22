import "react-native-gesture-handler";
import AuthNavigator from "@navigations/AuthNavigator";
import { NavigationContainer } from "@react-navigation/native";

const App = () => {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
};
export default App;
