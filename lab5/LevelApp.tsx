import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Accelerometer } from "expo-sensors";

const { height, width } = Dimensions.get("window");

const LevelApp: React.FC = () => {
  const [acceleration, setAcceleration] = useState({ x: 0, y: 0, z: 0 });
  const [angle, setAngle] = useState(0);

  // Функція для обробки даних з акселерометра
  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerationData) => {
      setAcceleration(accelerationData);
      // Розрахунок кута нахилу на основі даних з акселерометра
      const angle =
        Math.atan2(accelerationData.y, accelerationData.z) * (180 / Math.PI);
      setAngle(angle);
    });

    // Запуск акселерометра
    Accelerometer.setUpdateInterval(100);

    // Очищення після завершення компонента
    return () => subscription.remove();
  }, []);

  const linePosition = (angle: number) => {
    return {
      transform: [{ rotate: `${angle}deg` }],
    };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Будівельний рівень</Text>
      <Text style={styles.angleText}>Кут нахилу: {angle.toFixed(2)}°</Text>

      <Text style={styles.accelerationText}>
        X: {acceleration.x.toFixed(2)} Y: {acceleration.y.toFixed(2)} Z:{" "}
        {acceleration.z.toFixed(2)}
      </Text>

      <View style={[styles.levelLineContainer, linePosition(angle)]}>
        <View style={styles.levelLine} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  angleText: {
    fontSize: 18,
    marginBottom: 10,
  },
  levelLineContainer: {
    position: "absolute",
    bottom: 200,
    width: width * 0.8,
    height: 10,
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
  },
  levelLine: {
    width: "100%",
    height: 2,
    backgroundColor: "black",
  },
  accelerationText: {
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default LevelApp;
