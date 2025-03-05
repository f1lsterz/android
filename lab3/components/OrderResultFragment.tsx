import { View, Text, Button, StyleSheet } from "react-native";

interface OrderResultFragmentProps {
  orderInfo: string;
  setOrderInfo: (info: string) => void;
  clearForm: () => void;
}

// Компонент для відображення результатів замовлення
export default function OrderResultFragment({
  orderInfo,
  setOrderInfo,
  clearForm,
}: OrderResultFragmentProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.result}>{orderInfo}</Text>
      <Button
        title="Cancel"
        onPress={() => {
          setOrderInfo("");
          clearForm();
        }}
        color="red"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  result: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
    marginBottom: 10,
  },
});
