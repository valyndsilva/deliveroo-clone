import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BasketScreen, DeliveryScreen, HomeScreen, PreparingOrderScreen, RestaurantScreen} from "./screens";
import { store } from "./redux/store";
import { Provider } from "react-redux";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen
            name="Basket"
            component={BasketScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} options={{ presentation: "fullScreenModal", headerShown: false }}/>
          <Stack.Screen name="Delivery" component={DeliveryScreen} options={{ presentation: "fullScreenModal", headerShown: false }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
