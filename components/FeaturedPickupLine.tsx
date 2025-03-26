import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import { PickupLine } from '@/mocks/pickup-lines';
import { colors } from '@/constants/colors';
import { PickupLineCard } from './PickupLineCard';

type FeaturedPickupLineProps = {
  line: PickupLine;
  title: string;
  categoryName?: string;
};

export const FeaturedPickupLine = ({ line, title, categoryName }: FeaturedPickupLineProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Sparkles size={20} color={colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      
      <PickupLineCard 
        line={line} 
        showCategory={!!categoryName} 
        categoryName={categoryName} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  headerContainer: {
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
});