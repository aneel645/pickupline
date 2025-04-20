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
import { Database, Trash2, X } from "lucide-react-native";
import { colors } from "@/constants/colors";
import { PickupLineCard } from "@/components/PickupLineCard";
import { EmptyState } from "@/components/EmptyState";
import { usePickupStore } from "@/store/pickup-store";
import { categories } from "@/mocks/pickup-lines";

export default function MyCollectionScreen() {
  const { aiGeneratedLines, removeAIGeneratedLine, clearAllAIGeneratedLines } =
    usePickupStore();

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : "Custom";
  };

  const handleDeleteLine = (id: string) => {
    Alert.alert("Delete Line", "Are you sure you want to delete this line?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => removeAIGeneratedLine(id),
        style: "destructive",
      },
    ]);
  };

  const handleClearAllLines = () => {
    Alert.alert(
      "Clear All Lines",
      "Are you sure you want to delete all AI-generated lines?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          onPress: () => clearAllAIGeneratedLines(),
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
        {aiGeneratedLines.length > 0 ? (
          <>
            <View style={styles.headerContainer}>
              <View>
                <Text style={styles.title}>My AI Collection</Text>
                <Text style={styles.subtitle}>
                  {aiGeneratedLines.length}{" "}
                  {aiGeneratedLines.length === 1 ? "line" : "lines"} generated
                </Text>
              </View>
              <Pressable
                style={styles.clearButton}
                onPress={handleClearAllLines}
              >
                <Trash2 size={18} color={colors.error} />
                <Text style={styles.clearButtonText}>Clear All</Text>
              </Pressable>
            </View>

            {aiGeneratedLines.map((line) => (
              <View key={line.id} style={styles.lineContainer}>
                <PickupLineCard
                  line={{
                    id: line.id,
                    text: line.text,
                    categoryId: line.categoryId,
                    rating: 5,
                  }}
                  showCategory
                  categoryName={getCategoryNameById(line.categoryId)}
                />
                <Pressable
                  style={styles.deleteButton}
                  onPress={() => handleDeleteLine(line.id)}
                >
                  <X size={16} color={colors.error} />
                </Pressable>
              </View>
            ))}
          </>
        ) : (
          <EmptyState
            title="No saved AI lines yet"
            message="Generate and save AI pickup lines to build your collection."
            icon={<Database size={40} color={colors.textLight} />}
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
  lineContainer: {
    position: "relative",
    marginBottom: 12,
  },
  deleteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(255, 107, 107, 0.1)",
    borderRadius: 20,
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
});
