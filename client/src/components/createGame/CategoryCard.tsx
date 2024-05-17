import React from 'react';
import {StyleSheet, Text, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CategoryInterface} from '../../types/categories';
import {colorList} from '../../constants/colors';

interface CategoryCardProps {
  category: CategoryInterface;
  isSelected: boolean;
  onSelect: (category: CategoryInterface) => void;
}

export default function CategoryCard({
  category,
  isSelected,
  onSelect,
}: CategoryCardProps) {
  return (
    // TODO: Replace onSelect with redux
    <Pressable onPress={() => onSelect(category)}>
      {isSelected ? (
        <LinearGradient
          colors={[colorList.neonPink, colorList.softPink]}
          style={[styles.cardBase, styles.selectedContainer]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={[styles.textBase, styles.textSelected]}>
            {category.name}
          </Text>
        </LinearGradient>
      ) : (
        <View style={[styles.cardBase, styles.card]}>
          <Text style={[styles.textBase, styles.text]}>{category.name}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardBase: {
    shadowColor: colorList.neonPink,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
    alignItems: 'center',
    padding: 20,
    marginVertical: 5,
    borderRadius: 20,
  },
  card: {
    borderColor: colorList.neonPink,
    borderWidth: 2,

    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  selectedContainer: {
    borderColor: colorList.neonPink,
  },
  textBase: {
    fontSize: 20,
    fontWeight: '700',
  },
  text: {
    color: colorList.white,
  },
  textSelected: {
    color: colorList.black,
  },
});
