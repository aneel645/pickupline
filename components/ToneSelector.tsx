import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { colors } from '@/constants/colors';

type ToneSelectorProps = {
  selectedTone: string;
  onSelectTone: (tone: string) => void;
};

const tones = [
  { id: 'flirty', name: 'Flirty' },
  { id: 'funny', name: 'Funny' },
  { id: 'romantic', name: 'Romantic' },
  { id: 'witty', name: 'Witty' },
  { id: 'charming', name: 'Charming' },
  { id: 'playful', name: 'Playful' },
];

export const ToneSelector = ({ 
  selectedTone, 
  onSelectTone 
}: ToneSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tone</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {tones.map((tone) => (
          <Pressable
            key={tone.id}
            style={[
              styles.toneButton,
              selectedTone === tone.id && styles.selectedToneButton
            ]}
            onPress={() => onSelectTone(tone.id)}
          >
            <Text 
              style={[
                styles.toneText,
                selectedTone === tone.id && styles.selectedToneText
              ]}
            >
              {tone.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  toneButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  selectedToneButton: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondary,
  },
  toneText: {
    fontSize: 14,
    color: colors.text,
  },
  selectedToneText: {
    color: colors.background,
    fontWeight: '600',
  },
});