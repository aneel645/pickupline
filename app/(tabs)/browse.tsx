import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Search, X } from 'lucide-react-native';
import { categories, pickupLines, PickupLine } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { CategoryCard } from '@/components/CategoryCard';
import { PickupLineCard } from '@/components/PickupLineCard';
import { EmptyState } from '@/components/EmptyState';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<PickupLine[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = pickupLines.filter(line => 
      line.text.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setHasSearched(false);
  };

  const getCategoryNameById = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color={colors.textLight} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search pick-up lines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={clearSearch} style={styles.clearButton}>
              <X size={18} color={colors.textLight} />
            </Pressable>
          )}
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {hasSearched ? (
          <>
            <Text style={styles.resultsTitle}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchQuery}"
            </Text>
            
            {searchResults.length > 0 ? (
              searchResults.map(line => (
                <PickupLineCard 
                  key={line.id} 
                  line={line} 
                  showCategory 
                  categoryName={getCategoryNameById(line.categoryId)} 
                />
              ))
            ) : (
              <EmptyState
                title="No results found"
                message="Try a different search term or browse by category."
                icon={<Search size={40} color={colors.textLight} />}
              />
            )}
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Browse by Category</Text>
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </>
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
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
  },
  clearButton: {
    padding: 6,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
});