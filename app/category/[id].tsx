import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { categories, getLinesByCategory } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { PickupLineCard } from '@/components/PickupLineCard';
import { EmptyState } from '@/components/EmptyState';
import { FileQuestion } from 'lucide-react-native';

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const category = categories.find(cat => cat.id === id);
  const lines = getLinesByCategory(id || '');

  if (!category) {
    return (
      <EmptyState
        title="Category Not Found"
        message="The category you're looking for doesn't exist."
        icon={<FileQuestion size={40} color={colors.textLight} />}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen 
        options={{ 
          title: category.name,
          headerTitleStyle: {
            fontWeight: '600',
          },
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.description}>{category.description}</Text>
          <Text style={styles.count}>
            {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </Text>
        </View>

        {lines.map(line => (
          <PickupLineCard key={line.id} line={line} />
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
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
    color: colors.textLight,
  },
});