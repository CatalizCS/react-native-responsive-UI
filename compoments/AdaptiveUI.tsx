import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
  useWindowDimensions,
  KeyboardAvoidingView,
  StatusBar,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";

export default function AdaptiveUI() {
  const window = useWindowDimensions();
  const [orientation, setOrientation] = useState("portrait");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const updateOrientation = () => {
      const { width, height } = window;
      setOrientation(width > height ? "landscape" : "portrait");
    };

    updateOrientation();
    const subscription = Dimensions.addEventListener(
      "change",
      updateOrientation
    );

    return () => subscription?.remove();
  }, [window]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme === "light" ? "#f0f0f0" : "#222",
    },
    container: {
      flex: 1,
      padding: Platform.OS === "ios" ? 20 : 16,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme === "light" ? "#333" : "#fff",
    },
    themeToggle: {
      padding: 10,
      backgroundColor: theme === "light" ? "#333" : "#f0f0f0",
      borderRadius: 5,
    },
    themeToggleText: {
      color: theme === "light" ? "#fff" : "#333",
    },
    content: {
      flex: 1,
    },
    buttonsContainer: {
      flexDirection: orientation === "portrait" ? "column" : "row",
      justifyContent: "space-between",
      marginBottom: 20,
    },
    button: {
      width: orientation === "portrait" ? "100%" : "48%",
      marginBottom: orientation === "portrait" ? 10 : 0,
      backgroundColor: theme === "light" ? "#007AFF" : "#0A84FF",
      padding: 15,
      borderRadius: 5,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    image: {
      width: window.width * 0.8,
      height:
        orientation === "portrait" ? window.width * 0.6 : window.height * 0.3,
      resizeMode: "contain",
      alignSelf: "center",
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: theme === "light" ? "#ccc" : "#666",
      padding: 10,
      marginBottom: 20,
      color: theme === "light" ? "#333" : "#fff",
      backgroundColor: theme === "light" ? "#fff" : "#444",
    },
    cardContainer: {
      flexDirection: orientation === "portrait" ? "column" : "row",
      justifyContent: "space-between",
    },
    card: {
      width: orientation === "portrait" ? "100%" : "48%",
      backgroundColor: theme === "light" ? "#fff" : "#333",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      ...Platform.select({
        ios: {
          shadowColor: theme === "light" ? "#000" : "#fff",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        android: {
          elevation: 4,
        },
      }),
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
      color: theme === "light" ? "#333" : "#fff",
    },
    cardContent: {
      fontSize: 14,
      color: theme === "light" ? "#666" : "#ccc",
    },
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        backgroundColor={theme === "light" ? "#f0f0f0" : "#222"}
        barStyle={theme === "light" ? "dark-content" : "light-content"}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <Text style={styles.title}>Adaptive UI Demo</Text>
            <TouchableOpacity style={styles.themeToggle} onPress={toggleTheme}>
              <Text style={styles.themeToggleText}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Button 1</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Button 2</Text>
              </TouchableOpacity>
            </View>

            <Image
              source={{ uri: "https://placecats.com/400/300" }}
              style={styles.image}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter text here"
              placeholderTextColor={theme === "light" ? "#999" : "#888"}
            />

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Card 1</Text>
                <Text style={styles.cardContent}>
                  This is some sample content for Card 1. It adapts to both
                  light and dark themes.
                </Text>
              </View>
              <View style={styles.card}>
                <Text style={styles.cardTitle}>Card 2</Text>
                <Text style={styles.cardContent}>
                  Here's Card 2 with different content. The layout changes based
                  on screen orientation.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
