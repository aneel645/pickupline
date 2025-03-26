import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { categories, getLineOfTheDay, getFeaturedLines } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { FeaturedPickupLine } from '@/components/FeaturedPickupLine';
import { CategoryCard } from '@/components/CategoryCard';
import { usePickupStore } from '@/store/pickup-store';

export default function HomeScreen() {
  const lineOfTheDay = getLineOfTheDay();
  const featuredLines = getFeaturedLines().slice(0, 1);
  const { addRecentlyViewed } = usePickupStore();

  useEffect(() => {
    // Add line of the day to recently viewed
    addRecentlyViewed(lineOfTheDay.id);
  }, []);

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.greeting}>Find the perfect</Text>
          <Text style={styles.title}>Pick-up Line</Text>
        </View>

        <FeaturedPickupLine 
          line={lineOfTheDay} 
          title="Line of the Day" 
          categoryName={getCategoryNameById(lineOfTheDay.categoryId)}
        />

        {featuredLines.length > 0 && (
          <FeaturedPickupLine 
            line={featuredLines[0]} 
            title="Featured Line" 
            categoryName={getCategoryNameById(featuredLines[0].categoryId)}
          />
        )}

        <View style={styles.categoriesHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>

        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
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
    padding: 20,
    paddingTop: 16,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
  },
  categoriesHeader: {
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
});