import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";

export default function OrderViewScreen({ navigation }) {
  const [orderData, setOrderData] = useState("");

  const filePath = FileSystem.documentDirectory + "order.txt";

  useEffect(() => {
    // Функція для завантаження даних з файлу
    const loadFile = async () => {
      try {
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        if (!fileInfo.exists) {
          setOrderData("Немає збережених замовлень.");
          return;
        }
        const content = await FileSystem.readAsStringAsync(filePath);
        setOrderData(content);
      } catch (error) {
        Alert.alert("Помилка", "Не вдалося завантажити дані.");
      }
    };

    loadFile();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Збережене замовлення:</Text>
      <Text style={styles.content}>{orderData}</Text>
      <Button title="Назад" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  content: { fontSize: 16, textAlign: "center", marginBottom: 20 },
});
