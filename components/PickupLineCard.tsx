import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Alert, Platform } from 'react-native';
import { Heart, Copy, Star } from 'lucide-react-native';
import { PickupLine } from '@/mocks/pickup-lines';
import { usePickupStore } from '@/store/pickup-store';
import { colors } from '@/constants/colors';

type PickupLineCardProps = {
  line: PickupLine;
  showCategory?: boolean;
  categoryName?: string;
};

export const PickupLineCard = ({ line, showCategory = false, categoryName }: PickupLineCardProps) => {
  const { isFavorite, addFavorite, removeFavorite, getUserRating, ratePickupLine } = usePickupStore();
  const [copied, setCopied] = useState(false);
  const favorite = isFavorite(line.id);
  const userRating = getUserRating(line.id);

  const copyToClipboard = async () => {
    try {
      // Use navigator.clipboard for web
      if (Platform.OS === 'web') {
        await navigator.clipboard.writeText(line.text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } else {
        // For native platforms, we'll just show an alert since we can't use expo-clipboard
        Alert.alert('Copy to clipboard', 'This would copy the text in a real app');
      }
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      if (Platform.OS !== 'web') {
        Alert.alert('Error', 'Failed to copy to clipboard');
      }
    }
  };

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(line.id);
    } else {
      addFavorite(line.id);
    }
  };

  const handleRate = (rating: number) => {
    ratePickupLine(line.id, rating);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.lineText}>{line.text}</Text>
      
      {showCategory && categoryName && (
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>{categoryName}</Text>
        </View>
      )}
      
      <View style={styles.footer}>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Pressable 
              key={star} 
              onPress={() => handleRate(star)}
              style={styles.starButton}
            >
              <Star
                size={18}
                color={userRating && star <= userRating ? colors.warning : colors.textLight}
                fill={userRating && star <= userRating ? colors.warning : 'transparent'}
              />
            </Pressable>
          ))}
        </View>
        
        <View style={styles.actions}>
          <Pressable onPress={toggleFavorite} style={styles.actionButton}>
            <Heart
              size={22}
              color={favorite ? colors.favorite : colors.textLight}
              fill={favorite ? colors.favorite : 'transparent'}
            />
          </Pressable>
          
          <Pressable onPress={copyToClipboard} style={styles.actionButton}>
            <Copy size={22} color={copied ? colors.success : colors.textLight} />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  lineText: {
    fontSize: 18,
    color: colors.text,
    lineHeight: 26,
    marginBottom: 16,
  },
  categoryContainer: {
    backgroundColor: colors.primary + '20', // 20% opacity
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  starButton: {
    padding: 4,
    marginRight: 2,
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
});