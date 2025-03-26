import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { CategorySelector } from '@/components/CategorySelector';
import { ToneSelector } from '@/components/ToneSelector';
import { AIPickupLineGenerator } from '@/components/AIPickupLineGenerator';

export default function GenerateScreen() {
  const [selectedCategory, setSelectedCategory] = useState('funny');
  const [selectedTone, setSelectedTone] = useState('flirty');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Sparkles size={24} color={colors.primary} style={styles.headerIcon} />
          <Text style={styles.title}>AI Pickup Line Generator</Text>
          <Text style={styles.subtitle}>
            Create unique pickup lines powered by AI
          </Text>
        </View>

        <View style={styles.selectors}>
          <CategorySelector 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <ToneSelector 
            selectedTone={selectedTone}
            onSelectTone={setSelectedTone}
          />
        </View>

        <AIPickupLineGenerator 
          selectedCategory={selectedCategory}
          selectedTone={selectedTone}
        />
        
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How it works</Text>
          <Text style={styles.infoText}>
            Our AI generates unique pickup lines based on your selected category and tone.
            Each line is created just for you and can be saved to your favorites.
          </Text>
          
          <Text style={styles.disclaimer}>
            Note: AI-generated content may vary in quality and appropriateness.
            Use your best judgment before trying these lines in real life!
          </Text>
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
  content: {
    padding: 16,
    paddingBottom: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
  },
  headerIcon: {
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 8,
  },
  selectors: {
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
    lineHeight: 18,
  },
});