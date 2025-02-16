import { StyleSheet, View } from "react-native";
import OrderForm from "./components/OrderForm";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Форма для оформлення замовлення */}
      <OrderForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
});
