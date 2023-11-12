import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import screen1 from "./screens/Screen1"
import screen2 from "./screens/Screen2"
import screen3 from "./screens/Screen3"
import screen4 from "./screens/Screen4"
const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="screen1" component={screen1} options={{headerShown:"false"}} />
        <Stack.Screen name="screen2" component={screen2} />
        <Stack.Screen name="screen3" component={screen3} />
        <Stack.Screen name="screen4" component={screen4} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


