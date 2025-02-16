import { useState, useRef } from "react";
import { View, StyleSheet } from "react-native";
import OrderFormFragment from "./components/OrderFormFragment";
import OrderResultFragment from "./components/OrderResultFragment";

export default function App() {
  const [orderInfo, setOrderInfo] = useState("");
  const clearForm = useRef<() => void>(() => {});

  return (
    <View style={styles.container}>
      {/* Форма для створення замовлення */}
      <OrderFormFragment
        setOrderInfo={setOrderInfo}
        setClearForm={(clearFunction) => (clearForm.current = clearFunction)}
      />

      {/* Відображення інформації про замовлення */}
      {orderInfo ? (
        <OrderResultFragment
          orderInfo={orderInfo}
          setOrderInfo={setOrderInfo}
          clearForm={() => clearForm.current?.()}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
});
