// Головний компонент застосунку, що дозволяє вибирати файл, вводити URL,
// завантажувати медіа та відтворювати його.
import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import FilePicker from "./components/FilePicker";
import UrlInput from "./components/UrlInput";
import DownloadManager from "./components/DownloadManager";
import MediaPlayer from "./components/MediaPlayer";

const App: React.FC = () => {
  const [fileUri, setFileUri] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string>("");

  const handleFilePicked = (uri: string) => {
    setFileUri(uri);
  };

  const handleUrlSubmit = (url: string) => {
    setFileUri(url);
  };

  const handleDownloadUrlSubmit = (url: string) => {
    setDownloadUrl(url);
  };

  const handleDownloadComplete = (uri: string) => {
    setFileUri(uri);
    setDownloadUrl("");
  };

  const handleStop = () => {
    setFileUri(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Media Player App</Text>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Завантаження медіа</Text>
        <FilePicker onFilePicked={handleFilePicked} />
        <UrlInput
          onUrlSubmit={handleUrlSubmit}
          onDownloadUrlSubmit={handleDownloadUrlSubmit}
        />
      </View>
      {downloadUrl !== "" && (
        <DownloadManager
          downloadUrl={downloadUrl}
          onDownloadComplete={handleDownloadComplete}
        />
      )}
      {fileUri && (
        <View style={styles.section}>
          <MediaPlayer fileUri={fileUri} onStop={handleStop} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    marginVertical: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 10,
  },
  section: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
});

export default App;
