import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Home, Currencies } from "@/screens";

import type { ApplicationStackParamList } from "@/types/navigation";

const Stack = createStackNavigator<ApplicationStackParamList>();

function ApplicationNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Currencies" component={Currencies} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default ApplicationNavigator;
