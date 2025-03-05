import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import RadioGroup from "./RadioGroup";

interface OrderFormFragmentProps {
  setOrderInfo: (info: string) => void;
  setClearForm: (clearFunction: () => void) => void;
}

// Компонент для форми замовлення
export default function OrderFormFragment({
  setOrderInfo,
  setClearForm,
}: OrderFormFragmentProps) {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const filePath = FileSystem.documentDirectory + "order.txt";

  const saveToFile = async (content: string) => {
    try {
      await FileSystem.writeAsStringAsync(filePath, content);
      Alert.alert("Успіх", "Замовлення збережено у файл!");
    } catch (error) {
      Alert.alert("Помилка", "Не вдалося зберегти дані.");
    }
  };

  const handleSubmit = async () => {
    if (!name || !color || !priceRange) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля!");
      return;
    }

    const orderData = `Замовлення для: ${name}\nКолір: ${color}\nЦіна: ${priceRange}`;
    setOrderInfo(orderData);
    await saveToFile(orderData);
  };

  const clearForm = () => {
    setName("");
    setColor("");
    setPriceRange("");
  };

  useEffect(() => {
    setClearForm(clearForm);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ім'я замовника:</Text>
      <TextInput
        style={styles.input}
        placeholder="Введіть ваше ім'я"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Виберіть колір:</Text>
      <RadioGroup
        options={["Червоний", "Білий", "Жовтий"]}
        selected={color}
        onSelect={setColor}
      />

      <Text style={styles.label}>Виберіть діапазон цін:</Text>
      <RadioGroup
        options={["100-200 грн", "200-300 грн", "300-400 грн"]}
        selected={priceRange}
        onSelect={setPriceRange}
      />

      <Button title="ОК" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: "100%", padding: 10 },
  label: { fontSize: 16, fontWeight: "bold", marginVertical: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});
