import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Heart } from 'lucide-react-native';
import { pickupLines, categories } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { PickupLineCard } from '@/components/PickupLineCard';
import { EmptyState } from '@/components/EmptyState';
import { usePickupStore } from '@/store/pickup-store';

export default function FavoritesScreen() {
  const { favorites } = usePickupStore();
  
  const favoriteLines = pickupLines.filter(line => 
    favorites.includes(line.id)
  );

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
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
            <Text style={styles.title}>Your Favorites</Text>
            <Text style={styles.subtitle}>
              {favoriteLines.length} {favoriteLines.length === 1 ? 'line' : 'lines'} saved
            </Text>
            
            {favoriteLines.map(line => (
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 20,
  },
});