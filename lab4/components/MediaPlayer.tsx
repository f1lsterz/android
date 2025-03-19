// Компонент для відтворення аудіо та відео, підтримує відтворення, паузу та зупинку медіа.
import React, { useState, useEffect, useRef } from "react";
import { View, Button, StyleSheet } from "react-native";
import { Audio, ResizeMode, Video } from "expo-av";

interface MediaPlayerProps {
  fileUri: string;
  onStop: () => void;
}

const MediaPlayer: React.FC<MediaPlayerProps> = ({ fileUri, onStop }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const videoRef = useRef<Video>(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const playMedia = async () => {
    try {
      if (fileUri.endsWith(".mp4")) {
        await videoRef.current?.playAsync();
      } else if (
        fileUri.endsWith(".mp3") ||
        fileUri.endsWith(".m4a") ||
        fileUri.endsWith(".wav")
      ) {
        const { sound } = await Audio.Sound.createAsync(
          { uri: fileUri },
          { shouldPlay: true }
        );
        setSound(sound);
      }
      setIsPlaying(true);
    } catch (error) {
      console.log("Error playing media", error);
    }
  };

  const pauseMedia = async () => {
    try {
      if (fileUri.endsWith(".mp4")) {
        await videoRef.current?.pauseAsync();
      } else if (
        (fileUri.endsWith(".mp3") ||
          fileUri.endsWith(".m4a") ||
          fileUri.endsWith(".wav")) &&
        sound
      ) {
        await sound.pauseAsync();
      }
      setIsPlaying(false);
    } catch (error) {
      console.log("Error pausing media", error);
    }
  };

  const stopMedia = async () => {
    try {
      if (fileUri.endsWith(".mp4")) {
        await videoRef.current?.stopAsync();
      } else if (
        (fileUri.endsWith(".mp3") ||
          fileUri.endsWith(".m4a") ||
          fileUri.endsWith(".wav")) &&
        sound
      ) {
        await sound.stopAsync();
      }
      setIsPlaying(false);
      onStop();
    } catch (error) {
      console.log("Error stopping media", error);
    }
  };

  const togglePlayPause = async () => {
    if (isPlaying) {
      await pauseMedia();
    } else {
      await playMedia();
    }
  };

  return (
    <View style={styles.mediaContainer}>
      {fileUri.endsWith(".mp4") ? (
        <Video
          ref={videoRef}
          source={{ uri: fileUri }}
          style={styles.media}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={isPlaying}
          isLooping
        />
      ) : null}
      <View style={styles.controls}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={togglePlayPause}
        />
        <Button title="Stop" onPress={stopMedia} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
});

export default MediaPlayer;
