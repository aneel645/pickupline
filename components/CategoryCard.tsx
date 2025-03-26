import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { PickupLineCategory } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { Laugh, Heart, Brain, Glasses, Sparkles } from 'lucide-react-native';

type CategoryCardProps = {
  category: PickupLineCategory;
};

export const CategoryCard = ({ category }: CategoryCardProps) => {
  const router = useRouter();

  const navigateToCategory = () => {
    router.push(`/category/${category.id}`);
  };

  // Map category icons to actual components
  const renderIcon = () => {
    switch (category.icon) {
      case 'laugh':
        return <Laugh size={24} color={colors.primary} />;
      case 'heart':
        return <Heart size={24} color={colors.primary} />;
      case 'brain':
        return <Brain size={24} color={colors.primary} />;
      case 'glasses':
        return <Glasses size={24} color={colors.primary} />;
      case 'sparkles':
        return <Sparkles size={24} color={colors.primary} />;
      default:
        return <Sparkles size={24} color={colors.primary} />;
    }
  };

  return (
    <Pressable style={styles.card} onPress={navigateToCategory}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{category.name}</Text>
        <Text style={styles.description}>{category.description}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary + '15', // 15% opacity
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});