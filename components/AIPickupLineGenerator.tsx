import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import { Sparkles, RefreshCw, Save } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { generatePickupLine } from '@/services/deepseek-api';
import { PickupLineCard } from './PickupLineCard';
import { categories } from '@/mocks/pickup-lines';
import { usePickupStore } from '@/store/pickup-store';

type AIPickupLineGeneratorProps = {
  selectedCategory: string;
  selectedTone: string;
};

export const AIPickupLineGenerator = ({ 
  selectedCategory, 
  selectedTone 
}: AIPickupLineGeneratorProps) => {
  const [generatedLine, setGeneratedLine] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const { saveAIGeneratedLine } = usePickupStore();

  const generateLine = async () => {
    setIsLoading(true);
    setError(null);
    setIsSaved(false);
    
    try {
      const line = await generatePickupLine(selectedCategory, selectedTone);
      setGeneratedLine(line);
    } catch (err) {
      setError('Failed to generate pickup line. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const saveGeneratedLine = () => {
    if (generatedLine) {
      saveAIGeneratedLine(generatedLine, selectedCategory, selectedTone);
      setIsSaved(true);
    }
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Custom';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Sparkles size={20} color={colors.primary} />
          <Text style={styles.title}>AI Generated Line</Text>
        </View>
        
        <Pressable 
          style={styles.generateButton} 
          onPress={generateLine}
          disabled={isLoading}
        >
          <Text style={styles.generateButtonText}>
            {generatedLine ? 'Regenerate' : 'Generate'}
          </Text>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.background} style={styles.buttonIcon} />
          ) : (
            <RefreshCw size={16} color={colors.background} style={styles.buttonIcon} />
          )}
        </Pressable>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : generatedLine ? (
        <View>
          <PickupLineCard 
            line={{
              id: 'ai-generated-temp',
              text: generatedLine,
              categoryId: selectedCategory,
              rating: 5,
            }}
            showCategory
            categoryName={getCategoryName(selectedCategory)}
          />
          <Pressable 
            style={[
              styles.saveButton, 
              isSaved && styles.savedButton
            ]} 
            onPress={saveGeneratedLine}
            disabled={isSaved}
          >
            <Save size={16} color={isSaved ? colors.background : colors.primary} style={styles.saveIcon} />
            <Text style={[
              styles.saveButtonText,
              isSaved && styles.savedButtonText
            ]}>
              {isSaved ? 'Saved to Collection' : 'Save to My Collection'}
            </Text>
          </Pressable>
        </View>
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Generate an AI pickup line based on your selected category and tone.
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  generateButtonText: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
  buttonIcon: {
    marginLeft: 6,
  },
  placeholderContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
  },
  placeholderText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: colors.error + '15',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: 'center',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 12,
    marginTop: 8,
  },
  savedButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  saveButtonText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  savedButtonText: {
    color: colors.background,
  },
  saveIcon: {
    marginRight: 8,
  },
});