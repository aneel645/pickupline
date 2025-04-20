import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { Heart, Trash2 } from "lucide-react-native";
import { pickupLines, categories } from "@/mocks/pickup-lines";
import { colors } from "@/constants/colors";
import { PickupLineCard } from "@/components/PickupLineCard";
import { EmptyState } from "@/components/EmptyState";
import { usePickupStore } from "@/store/pickup-store";

export default function FavoritesScreen() {
  const { favorites, clearAllFavorites } = usePickupStore();

  const favoriteLines = pickupLines.filter((line) =>
    favorites.includes(line.id)
  );

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "";
  };

  const handleClearAllFavorites = () => {
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all favorites?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          onPress: () => clearAllFavorites(),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {favoriteLines.length > 0 ? (
          <>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.title}>Your Favorites</Text>
                <Text style={styles.subtitle}>
                  {favoriteLines.length}{" "}
                  {favoriteLines.length === 1 ? "line" : "lines"} saved
                </Text>
              </View>
              <Pressable
                style={styles.clearButton}
                onPress={handleClearAllFavorites}
              >
                <Trash2 size={18} color={colors.error} />
                <Text style={styles.clearButtonText}>Clear All</Text>
              </Pressable>
            </View>

            {favoriteLines.map((line) => (
              <PickupLineCard
                key={line.id}
                line={line}
                showCategory
                categoryName={getCategoryNameById(line.categoryId)}
              />
            ))}
          </>
        ) : (
          <EmptyState
            title="No favorites yet"
            message="Save your favorite pick-up lines by tapping the heart icon."
            icon={<Heart size={40} color={colors.textLight} />}
          />
        )}
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
  content: {
    padding: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: colors.error,
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});
