// Форма замовлення квітів
import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import RadioGroup from "./RadioGroup";

export default function OrderForm() {
  const [name, setName] = useState(""); // Ім'я користувача
  const [color, setColor] = useState(""); // Вибір кольору
  const [priceRange, setPriceRange] = useState(""); // Вибір цінового діапазону
  const [orderInfo, setOrderInfo] = useState(""); // Результат замовлення

  const handleSubmit = () => {
    // Перевірка на заповненість усіх полів
    if (!name || !color || !priceRange) {
      Alert.alert("Помилка", "Будь ласка, заповніть всі поля!");
      return;
    }

    // Формування інформації про замовлення
    setOrderInfo(
      `Замовлення для : ${name}\nКолір: ${color}\nЦіна: ${priceRange}`
    );
  };

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

      {/* Кнопка для підтвердження замовлення */}
      <Button title="ОК" onPress={handleSubmit} />

      {/* Відображення інформації про замовлення */}
      {orderInfo ? <Text style={styles.result}>{orderInfo}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});
