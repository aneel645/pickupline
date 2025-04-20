import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  Platform,
  Alert,
} from "react-native";
import { PickupLine, categories } from "@/mocks/pickup-lines";
import { colors } from "@/constants/colors";
import {
  Heart,
  Copy,
  Star,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
} from "lucide-react-native";
import { Pressable } from "react-native";
import { usePickupStore } from "@/store/pickup-store";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");
const SWIPE_THRESHOLD = 120;
const ROTATION_MAGNITUDE = 15; // Maximum rotation in degrees
const SWIPE_ANIMATION_DURATION = 400; // Animation duration in milliseconds

type SwipableCardProps = {
  lines: PickupLine[];
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
};

export const SwipableCard = ({
  lines,
  onSwipeLeft,
  onSwipeRight,
}: SwipableCardProps) => {
  // Validate input data
  if (!lines || lines.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No pickup lines available</Text>
      </View>
    );
  }

  const [currentIndex, setCurrentIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyTimeoutId, setCopyTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false); // Track if card is currently animating
  const [showWebControls, setShowWebControls] = useState(Platform.OS === "web");

  const position = useRef(new Animated.ValueXY()).current;

  // Memoize interpolated values to prevent recalculation on each render
  const animatedValues = useMemo(() => {
    const rotation = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [
        `-${ROTATION_MAGNITUDE}deg`,
        "0deg",
        `${ROTATION_MAGNITUDE}deg`,
      ],
      extrapolate: "clamp",
    });

    const opacity = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [0.8, 1, 0.8],
      extrapolate: "clamp",
    });

    const scale = position.x.interpolate({
      inputRange: [-width / 2, 0, width / 2],
      outputRange: [0.95, 1, 0.95],
      extrapolate: "clamp",
    });

    return { rotation, opacity, scale };
  }, [position.x]);

  const {
    isFavorite,
    addFavorite,
    removeFavorite,
    getUserRating,
    ratePickupLine,
    addRecentlyViewed,
  } = usePickupStore();

  // Safely access current and next lines with boundary checks
  // Memoize these values to prevent recalculation on each render
  const safeCurrentIndex = useMemo(
    () => Math.min(Math.max(0, currentIndex), lines.length - 1),
    [currentIndex, lines.length]
  );

  const currentLine = useMemo(
    () => lines[safeCurrentIndex],
    [lines, safeCurrentIndex]
  );

  const nextLine = useMemo(
    () =>
      lines.length > 1 ? lines[(safeCurrentIndex + 1) % lines.length] : null,
    [lines, safeCurrentIndex]
  );

  // Memoize category name lookup to prevent recalculation on each render
  const getCategoryName = useCallback((categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  }, []);

  const currentCategory = useMemo(
    () => getCategoryName(currentLine?.categoryId || ""),
    [currentLine?.categoryId, getCategoryName]
  );

  // Memoize pan responder to prevent recreation on each render
  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => !isAnimating, // Prevent new gestures while animating
      onMoveShouldSetPanResponder: (_, gesture) => {
        // Only respond to horizontal movements when not animating
        return !isAnimating && Math.abs(gesture.dx) > Math.abs(gesture.dy * 2);
      },
      onPanResponderMove: (_, gesture) => {
        // Only update position if not animating
        if (!isAnimating) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        try {
          // Prevent rapid consecutive swipes
          if (isAnimating) return;

          if (gesture.dx > SWIPE_THRESHOLD) {
            swipeRight();
            // Provide haptic feedback on swipe
            if (Platform.OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          } else if (gesture.dx < -SWIPE_THRESHOLD) {
            swipeLeft();
            // Provide haptic feedback on swipe
            if (Platform.OS !== "web") {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
          } else {
            resetPosition();
          }
        } catch (error) {
          console.error("Error in pan responder release:", error);
          resetPosition(); // Fallback to reset position on error
        }
      },
    });
  }, [isAnimating, position]); // Dependencies that don't cause circular reference

  // Memoize animation functions to prevent recreation on each render
  const resetPosition = useCallback(() => {
    setIsAnimating(true);
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      friction: 5,
      useNativeDriver: true,
    }).start(() => {
      setIsAnimating(false);
    });
  }, [position]);

  const nextCard = useCallback(() => {
    position.setValue({ x: 0, y: 0 });
    setCurrentIndex((prevIndex) => {
      if (lines.length === 0) return 0;

      const newIndex = prevIndex + 1 >= lines.length ? 0 : prevIndex + 1;
      return newIndex;
    });

    // Use setTimeout to delay adding to recently viewed
    // This prevents the state update during render issue
    const nextIndex = (currentIndex + 1) % lines.length;
    if (lines[nextIndex] && lines[nextIndex].id) {
      setTimeout(() => {
        addRecentlyViewed(lines[nextIndex].id);
      }, 0);
    }
  }, [position, lines, addRecentlyViewed, currentIndex]);

  const swipeLeft = useCallback(() => {
    // Prevent swipe if already animating
    if (isAnimating) return;

    // Set animating state to prevent new gestures
    setIsAnimating(true);

    // Use timing instead of spring for more controlled animation
    Animated.timing(position, {
      toValue: { x: -width * 1.5, y: 0 },
      duration: SWIPE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      if (onSwipeLeft) onSwipeLeft();
      nextCard();
      // Reset animating state after animation completes
      // Increase timeout to ensure animation completes fully
      setTimeout(() => setIsAnimating(false), 100);
    });
  }, [position, onSwipeLeft, nextCard, isAnimating]);

  const swipeRight = useCallback(() => {
    // Prevent swipe if already animating
    if (isAnimating) return;

    // Set animating state to prevent new gestures
    setIsAnimating(true);

    // Use timing instead of spring for more controlled animation
    Animated.timing(position, {
      toValue: { x: width * 1.5, y: 0 },
      duration: SWIPE_ANIMATION_DURATION,
      useNativeDriver: true,
    }).start(() => {
      if (onSwipeRight) onSwipeRight();
      nextCard();
      // Reset animating state after animation completes
      // Increase timeout to ensure animation completes fully
      setTimeout(() => setIsAnimating(false), 100);
    });
  }, [position, onSwipeRight, nextCard, isAnimating]);

  // Clean up any pending timeouts when component unmounts
  useEffect(() => {
    // Add recently viewed for the initial card on mount
    if (currentLine && currentLine.id) {
      setTimeout(() => {
        addRecentlyViewed(currentLine.id);
      }, 0);
    }

    // Add keyboard event listeners for web platform
    if (Platform.OS === "web") {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          swipeLeft();
        } else if (event.key === "ArrowRight") {
          swipeRight();
        }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        if (copyTimeoutId) {
          clearTimeout(copyTimeoutId);
        }
      };
    }

    return () => {
      if (copyTimeoutId) {
        clearTimeout(copyTimeoutId);
      }
    };
  }, [copyTimeoutId, currentLine, addRecentlyViewed, swipeLeft, swipeRight]);

  const copyToClipboard = useCallback(async () => {
    if (!currentLine) return;

    try {
      // Clear any existing timeout
      if (copyTimeoutId) {
        clearTimeout(copyTimeoutId);
        setCopyTimeoutId(null);
      }

      // Use navigator.clipboard for web
      if (Platform.OS === "web") {
        await navigator.clipboard.writeText(currentLine.text);
        setCopied(true);
        const id = setTimeout(() => setCopied(false), 2000);
        setCopyTimeoutId(id);
      } else {
        // For native platforms, use expo-clipboard
        await Clipboard.setStringAsync(currentLine.text);
        setCopied(true);
        const id = setTimeout(() => setCopied(false), 2000);
        setCopyTimeoutId(id);

        // Provide feedback to user
        if (Platform.OS !== "web") {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        }
      }
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      // Show error message to user
      if (Platform.OS !== "web") {
        Alert.alert("Error", "Failed to copy to clipboard");
      }
    }
  }, [currentLine, copyTimeoutId]);

  const toggleFavorite = useCallback(() => {
    if (!currentLine) return;

    try {
      const favorite = isFavorite(currentLine.id);
      if (favorite) {
        removeFavorite(currentLine.id);
      } else {
        addFavorite(currentLine.id);
      }

      // Provide haptic feedback
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  }, [currentLine, isFavorite, addFavorite, removeFavorite]);

  const handleRate = useCallback(
    (rating: number) => {
      if (!currentLine) return;
      try {
        ratePickupLine(currentLine.id, rating);

        // Provide haptic feedback
        if (Platform.OS !== "web") {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
      } catch (error) {
        console.error("Error rating pickup line:", error);
      }
    },
    [currentLine, ratePickupLine]
  );

  // Memoize derived values to prevent recalculation on each render
  const favorite = useMemo(
    () => (currentLine ? isFavorite(currentLine.id) : false),
    [currentLine, isFavorite]
  );

  const userRating = useMemo(
    () => (currentLine ? getUserRating(currentLine.id) : undefined),
    [currentLine, getUserRating]
  );

  const cardStyle = useMemo(
    () => ({
      transform: [
        { translateX: position.x },
        { translateY: position.y },
        { rotate: animatedValues.rotation },
        { scale: animatedValues.scale },
      ],
      opacity: animatedValues.opacity,
    }),
    [position.x, position.y, animatedValues]
  );

  return (
    <View style={styles.container}>
      {nextLine && (
        <View style={[styles.card, styles.nextCard]}>
          <LinearGradient
            colors={["rgba(255,255,255,0.8)", "rgba(249,249,249,0.8)"]}
            style={styles.cardGradient}
          >
            <Text style={styles.nextCardText}>{nextLine.text}</Text>
          </LinearGradient>
        </View>
      )}

      <Animated.View
        style={[styles.card, cardStyle]}
        {...panResponder.panHandlers}
      >
        <LinearGradient
          colors={["#FFFFFF", "#F9F9F9"]}
          style={styles.cardGradient}
        >
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{currentCategory}</Text>
          </View>
          <Text style={styles.lineText}>{currentLine.text}</Text>

          <View style={styles.footer}>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Pressable
                  key={star}
                  onPress={() => handleRate(star)}
                  style={styles.starButton}
                >
                  <Star
                    size={22}
                    color={
                      userRating && star <= userRating
                        ? colors.warning
                        : colors.textLight
                    }
                    fill={
                      userRating && star <= userRating
                        ? colors.warning
                        : "transparent"
                    }
                  />
                </Pressable>
              ))}
            </View>

            <View style={styles.actions}>
              <Pressable onPress={toggleFavorite} style={styles.actionButton}>
                <Heart
                  size={26}
                  color={favorite ? colors.favorite : colors.textLight}
                  fill={favorite ? colors.favorite : "transparent"}
                />
              </Pressable>

              <Pressable onPress={copyToClipboard} style={styles.actionButton}>
                <Copy
                  size={26}
                  color={copied ? colors.success : colors.textLight}
                />
              </Pressable>
            </View>
          </View>

          {showWebControls ? (
            <View style={styles.webControls}>
              <Pressable onPress={swipeLeft} style={styles.webControlButton}>
                <ArrowLeft size={24} color={colors.primary} />
              </Pressable>
              <Text style={styles.swipeText}>Navigate to see more</Text>
              <Pressable onPress={swipeRight} style={styles.webControlButton}>
                <ArrowRight size={24} color={colors.primary} />
              </Pressable>
            </View>
          ) : (
            <View style={styles.swipeHint}>
              <ChevronLeft size={16} color={colors.textLight} />
              <Text style={styles.swipeText}>Swipe to see more</Text>
              <ChevronRight size={16} color={colors.textLight} />
            </View>
          )}
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    fontSize: 18,
    color: colors.textSecondary,
    textAlign: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    position: "absolute",
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: colors.card,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
    overflow: "hidden",
  },
  nextCard: {
    top: 10,
    transform: [{ scale: 0.92 }],
    opacity: 0.7,
  },
  cardGradient: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    borderRadius: 20,
  },
  lineText: {
    fontSize: 28,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 38,
  },
  nextCardText: {
    fontSize: 22,
    fontWeight: "500",
    color: colors.textSecondary,
    textAlign: "center",
    opacity: 0.7,
  },
  categoryBadge: {
    position: "absolute",
    top: 20,
    alignSelf: "center",
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: colors.primary + "20", // 20% opacity
    borderRadius: 20,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  ratingContainer: {
    flexDirection: "row",
  },
  starButton: {
    padding: 5,
  },
  actions: {
    flexDirection: "row",
  },
  actionButton: {
    marginLeft: 16,
    padding: 5,
  },
  swipeHint: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  webControls: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  webControlButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + "15", // 15% opacity
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
  },
  swipeText: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: "500",
  },
});
