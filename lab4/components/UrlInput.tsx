// Компонент для введення URL: дозволяє відтворювати або завантажувати медіа-файл.
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";

interface UrlInputProps {
  onUrlSubmit: (url: string) => void;
  onDownloadUrlSubmit: (url: string) => void;
}

const UrlInput: React.FC<UrlInputProps> = ({
  onUrlSubmit,
  onDownloadUrlSubmit,
}) => {
  const [url, setUrl] = useState("");

  const handlePlaySubmit = () => {
    if (url.trim() !== "") {
      onUrlSubmit(url.trim());
      setUrl("");
    }
  };

  const handleDownloadSubmit = () => {
    if (url.trim() !== "") {
      onDownloadUrlSubmit(url.trim());
      setUrl("");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Введіть URL файлу:</Text>
      <TextInput
        style={styles.input}
        placeholder="http://example.com/file.mp4"
        value={url}
        onChangeText={setUrl}
      />
      <View style={styles.buttonsRow}>
        <Button title="Програти" onPress={handlePlaySubmit} />
        <Button title="Завантажити" onPress={handleDownloadSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
  },
});

export default UrlInput;
