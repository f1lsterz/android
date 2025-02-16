// Компонент групи радіокнопок для вибору кольору або цінового діапазону
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

interface RadioGroupProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function RadioGroup({
  options,
  selected,
  onSelect,
}: RadioGroupProps) {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          style={styles.radioContainer}
          onPress={() => onSelect(selected === option ? "" : option)}
        >
          {/* Візуальне відображення вибраної кнопки */}
          <View
            style={[styles.radio, selected === option && styles.radioSelected]}
          />
          <Text style={styles.text}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#555",
    marginRight: 10,
  },
  radioSelected: {
    backgroundColor: "#555",
  },
  text: {
    fontSize: 16,
  },
});
