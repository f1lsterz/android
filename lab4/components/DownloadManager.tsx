// Компонент для завантаження файлу за введеним URL та збереження його в медіа-бібліотеці.
import React, { useState } from "react";
import { Button, Text, StyleSheet, View, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";

interface DownloadManagerProps {
  downloadUrl: string;
  onDownloadComplete: (uri: string) => void;
}

const DownloadManager: React.FC<DownloadManagerProps> = ({
  downloadUrl,
  onDownloadComplete,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const downloadAndSaveFile = async () => {
    const extension = downloadUrl.endsWith(".mp4") ? ".mp4" : ".mp3";
    const fileUri = FileSystem.documentDirectory + "downloadedFile" + extension;
    setIsDownloading(true);
    setProgress(0);

    try {
      const downloadResumable = FileSystem.createDownloadResumable(
        downloadUrl,
        fileUri,
        {},
        (downloadProgress) => {
          const prog =
            downloadProgress.totalBytesWritten /
            downloadProgress.totalBytesExpectedToWrite;
          setProgress(prog);
        }
      );
      const result = await downloadResumable.downloadAsync();
      if (result && result.uri) {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permission required",
            "Permission to access media library is required to save file."
          );
          setIsDownloading(false);
          return;
        }
        const asset = await MediaLibrary.createAssetAsync(result.uri);
        await MediaLibrary.createAlbumAsync("Download", asset, false);

        setIsDownloading(false);
        onDownloadComplete(result.uri);
      } else {
        setIsDownloading(false);
        console.error("Download failed: result is undefined or missing uri");
      }
    } catch (error) {
      console.error("Download error: ", error);
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Завантажити файл за URL"
        onPress={downloadAndSaveFile}
        disabled={isDownloading}
      />
      {isDownloading && (
        <Text style={styles.progressText}>
          Завантаження... {Math.round(progress * 100)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    alignItems: "center",
  },
  progressText: {
    marginTop: 10,
  },
});

export default DownloadManager;
