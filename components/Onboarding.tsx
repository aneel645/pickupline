import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  SafeAreaView,
  Platform,
  StatusBar as RNStatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  Sparkles,
  Search,
  Heart,
  Database,
  ArrowRight,
} from "lucide-react-native";
import { colors } from "@/constants/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Key for storing onboarding completion status
const ONBOARDING_STORAGE_KEY = "@pickuplines:onboarding_complete";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

// Onboarding screens data
const slides = [
  {
    id: "1",
    title: "Browse Categories",
    description:
      "Explore a wide variety of pickup lines organized by categories like funny, cheesy, clever, and more.",
    icon: <Search size={80} color={colors.primary} />,
    backgroundColor: colors.background,
  },
  {
    id: "2",
    title: "AI-Powered Generation",
    description:
      "Create unique pickup lines with our AI generator. Customize by category and tone to match your style.",
    icon: <Sparkles size={80} color={colors.primary} />,
    backgroundColor: colors.background,
  },
  {
    id: "3",
    title: "Save Favorites",
    description:
      "Keep your favorite pickup lines in one place for quick access whenever you need them.",
    icon: <Heart size={80} color={colors.primary} />,
    backgroundColor: colors.background,
  },
  {
    id: "4",
    title: "Your Collection",
    description:
      "Build your personal collection of AI-generated pickup lines that reflect your unique personality.",
    icon: <Database size={80} color={colors.primary} />,
    backgroundColor: colors.background,
  },
];

type OnboardingProps = {
  onComplete: () => void;
};

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  // Handle skip button press
  const handleSkip = async () => {
    // Mark onboarding as complete in AsyncStorage
    await AsyncStorage.setItem(ONBOARDING_STORAGE_KEY, "true");
    onComplete();
  };

  // Handle next button press
  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleSkip();
    }
  };

  // Render individual slide
  const renderSlide = ({ item }: { item: (typeof slides)[0] }) => {
    return (
      <View
        style={[styles.slide, { backgroundColor: item.backgroundColor, width }]}
      >
        <View style={styles.iconContainer}>{item.icon}</View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  // Render pagination dots
  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              key={index}
              style={[styles.dot, { width: dotWidth, opacity }]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {renderPagination()}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ArrowRight size={20} color="white" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Check if onboarding has been completed
export const checkOnboardingStatus = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_STORAGE_KEY);
    return value === "true";
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    return false;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight ?? 0 : 0,
  },
  skipContainer: {
    position: "absolute",
    top: Platform.OS === "android" ? (RNStatusBar.currentHeight ?? 0) + 16 : 16,
    right: 16,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: "600",
  },
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  iconContainer: {
    marginBottom: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    marginHorizontal: 4,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginRight: 8,
  },
  buttonIcon: {
    marginLeft: 4,
  },
});
