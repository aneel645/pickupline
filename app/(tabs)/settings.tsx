import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
  Platform,
} from "react-native";
import { router } from "expo-router";
import {
  Trash2,
  Heart,
  Clock,
  Star,
  Share2,
  Info,
  ChevronRight,
  Database,
} from "lucide-react-native";
import { colors } from "@/constants/colors";
import { usePickupStore } from "@/store/pickup-store";
import FavoritesScreen from "@/components/favorites";
import MyCollectionScreen from "@/components/my-collection";

export default function SettingsScreen() {
  const {
    favorites,
    recentlyViewed,
    userRatings,
    aiGeneratedLines,
    clearAllFavorites,
    clearAllAIGeneratedLines,
  } = usePickupStore();

  const clearFavorites = () => {
    if (Platform.OS === "web") {
      if (confirm("Are you sure you want to clear all favorites?")) {
        clearAllFavorites();
      }
    } else {
      Alert.alert(
        "Clear Favorites",
        "Are you sure you want to clear all favorites?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => clearAllFavorites(),
          },
        ]
      );
    }
  };

  const clearHistory = () => {
    const store = usePickupStore.getState();
    if (Platform.OS === "web") {
      if (confirm("Are you sure you want to clear your viewing history?")) {
        store.setState({ recentlyViewed: [] });
      }
    } else {
      Alert.alert(
        "Clear History",
        "Are you sure you want to clear your viewing history?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => store.setState({ recentlyViewed: [] }),
          },
        ]
      );
    }
  };

  const clearRatings = () => {
    const store = usePickupStore.getState();
    if (Platform.OS === "web") {
      if (confirm("Are you sure you want to clear all your ratings?")) {
        store.setState({ userRatings: {} });
      }
    } else {
      Alert.alert(
        "Clear Ratings",
        "Are you sure you want to clear all your ratings?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => store.setState({ userRatings: {} }),
          },
        ]
      );
    }
  };

  const clearAICollection = () => {
    if (Platform.OS === "web") {
      if (confirm("Are you sure you want to clear your AI collection?")) {
        clearAllAIGeneratedLines();
      }
    } else {
      Alert.alert(
        "Clear AI Collection",
        "Are you sure you want to clear all your saved AI-generated lines?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Clear",
            style: "destructive",
            onPress: () => clearAllAIGeneratedLines(),
          },
        ]
      );
    }
  };

  const shareApp = () => {
    if (Platform.OS === "web") {
      alert("Sharing is not available on web");
    } else {
      Alert.alert("Share", "Sharing is not available yet");
    }
  };

  const showAbout = () => {
    if (Platform.OS === "web") {
      alert(
        "Pick-up Line App\nVersion 1.0.0\n\nA modern app for finding the perfect pick-up line using Artificial Intelligence."
      );
    } else {
      Alert.alert(
        "About",
        "Pick-up Line App\nVersion 1.0.0\n\nA modern app for finding the perfect pick-up line using Artificial Intelligence."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Data</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.favorite + "20" },
                ]}
              >
                <Heart size={20} color={colors.favorite} />
              </View>
              <Text style={styles.statValue}>{favorites.length}</Text>
              <Text style={styles.statLabel}>Favorites</Text>
            </View>

            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.secondary + "20" },
                ]}
              >
                <Clock size={20} color={colors.secondary} />
              </View>
              <Text style={styles.statValue}>{recentlyViewed.length}</Text>
              <Text style={styles.statLabel}>Viewed</Text>
            </View>

            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.warning + "20" },
                ]}
              >
                <Star size={20} color={colors.warning} />
              </View>
              <Text style={styles.statValue}>
                {Object.keys(userRatings).length}
              </Text>
              <Text style={styles.statLabel}>Rated</Text>
            </View>

            <View style={styles.statItem}>
              <View
                style={[
                  styles.statIcon,
                  { backgroundColor: colors.primary + "20" },
                ]}
              >
                <Database size={20} color={colors.primary} />
              </View>
              <Text style={styles.statValue}>{aiGeneratedLines.length}</Text>
              <Text style={styles.statLabel}>AI Lines</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Content</Text>

          <FavoritesScreen />

          <MyCollectionScreen />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Management</Text>

          <Pressable style={styles.settingItem} onPress={clearFavorites}>
            <View style={styles.settingContent}>
              <Trash2
                size={20}
                color={colors.error}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Clear Favorites</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>

          <Pressable style={styles.settingItem} onPress={clearHistory}>
            <View style={styles.settingContent}>
              <Trash2
                size={20}
                color={colors.error}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Clear History</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>

          <Pressable style={styles.settingItem} onPress={clearRatings}>
            <View style={styles.settingContent}>
              <Trash2
                size={20}
                color={colors.error}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Clear Ratings</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>

          <Pressable style={styles.settingItem} onPress={clearAICollection}>
            <View style={styles.settingContent}>
              <Trash2
                size={20}
                color={colors.error}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Clear AI Collection</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>

          <Pressable style={styles.settingItem} onPress={shareApp}>
            <View style={styles.settingContent}>
              <Share2
                size={20}
                color={colors.text}
                style={styles.settingIcon}
              />
              <Text style={styles.settingText}>Share App</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>

          <Pressable style={styles.settingItem} onPress={showAbout}>
            <View style={styles.settingContent}>
              <Info size={20} color={colors.text} style={styles.settingIcon} />
              <Text style={styles.settingText}>About</Text>
            </View>
            <ChevronRight size={20} color={colors.textLight} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
    marginBottom: 8,
    backgroundColor: colors.background,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statItem: {
    width: "48%",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    marginBottom: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
    color: colors.text,
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
