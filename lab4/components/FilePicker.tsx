//Дозволяє користувачу обрати аудіо або відео файл із пристрою за допомогою expo-document-picker.
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import * as DocumentPicker from "expo-document-picker";

interface FilePickerProps {
  onFilePicked: (uri: string) => void;
}

const FilePicker: React.FC<FilePickerProps> = ({ onFilePicked }) => {
  const pickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ["audio/*", "video/*"],
      });
      if ("uri" in result && typeof result.uri === "string") {
        onFilePicked(result.uri);
      } else {
        console.error("Невірний тип або не знайдено URI");
      }
    } catch (error) {
      console.error("Error picking file: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Обрати медіа файл" onPress={pickFile} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
});

export default FilePicker;
