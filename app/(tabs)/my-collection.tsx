import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Database } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { PickupLineCard } from '@/components/PickupLineCard';
import { EmptyState } from '@/components/EmptyState';
import { usePickupStore } from '@/store/pickup-store';
import { categories } from '@/mocks/pickup-lines';

export default function MyCollectionScreen() {
  const { aiGeneratedLines } = usePickupStore();
  
  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Custom';
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
            <Text style={styles.title}>My AI Collection</Text>
            <Text style={styles.subtitle}>
              {aiGeneratedLines.length} {aiGeneratedLines.length === 1 ? 'line' : 'lines'} generated
            </Text>
            
            {aiGeneratedLines.map(line => (
              <PickupLineCard 
                key={line.id} 
                line={{
                  id: line.id,
                  text: line.text,
                  categoryId: line.categoryId,
                  rating: 5,
                }} 
                showCategory 
                categoryName={getCategoryNameById(line.categoryId)} 
              />
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