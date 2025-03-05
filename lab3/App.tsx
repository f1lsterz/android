import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { View, StyleSheet, Button } from "react-native";
import OrderFormFragment from "./components/OrderFormFragment";
import OrderResultFragment from "./components/OrderResultFragment";
import OrderViewScreen from "./components/OrderViewScreen";
import { useState, useRef } from "react";

const Stack = createStackNavigator();

// Головний екран, на якому користувач заповнює форму
function HomeScreen({ navigation }) {
  const [orderInfo, setOrderInfo] = useState("");
  const clearForm = useRef<() => void>(() => {});

  return (
    <View style={styles.container}>
      <OrderFormFragment
        setOrderInfo={setOrderInfo}
        setClearForm={(clearFunction) => (clearForm.current = clearFunction)}
      />

      {orderInfo ? (
        <OrderResultFragment
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          clearForm={() => clearForm.current?.()}
        />
      ) : null}

      <Button
        title="Відкрити"
        onPress={() => navigation.navigate("OrderView")}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Замовлення" }}
        />
        <Stack.Screen
          name="OrderView"
          component={OrderViewScreen}
          options={{ title: "Перегляд замовлення" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
