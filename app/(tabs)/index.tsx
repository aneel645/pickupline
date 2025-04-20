import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  categories,
  getLineOfTheDay,
  getFeaturedLines,
  pickupLines,
} from "@/mocks/pickup-lines";
import { colors } from "@/constants/colors";
import { SwipableCard } from "@/components/SwipableCard";
import { usePickupStore } from "@/store/pickup-store";

export default function HomeScreen() {
  const lineOfTheDay = getLineOfTheDay();
  const featuredLines = getFeaturedLines();
  const { addRecentlyViewed } = usePickupStore();
  const [swipableLines, setSwipableLines] = useState<typeof pickupLines>([]);

  useEffect(() => {
    // Add line of the day to recently viewed
    addRecentlyViewed(lineOfTheDay.id);

    // Prepare lines for swipable cards
    // Start with featured lines and line of the day, then add the rest
    const priorityLines = [...featuredLines, lineOfTheDay];
    const uniqueIds = new Set(priorityLines.map((line) => line.id));

    const remainingLines = pickupLines.filter(
      (line) => !uniqueIds.has(line.id)
    );
    setSwipableLines([...priorityLines, ...remainingLines]);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        {/* <Text style={styles.greeting}>Find the perfect</Text> */}
        <Text style={styles.title}>Pick-up Line</Text>
      </View>

      <View style={styles.cardContainer}>
        {swipableLines.length > 0 && <SwipableCard lines={swipableLines} />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 10,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.text,
  },
  cardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
