import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import ParentCategoryButton from './ParentCategoryButton';

interface ParentCategoriesListProps {
  parentCategories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ParentCategoriesList({
  parentCategories,
  selectedCategory,
  onSelectCategory,
}: ParentCategoriesListProps) {
  return (
    <FlatList
      data={parentCategories}
      renderItem={({item}) => (
        <ParentCategoryButton
          item={item}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory} // TODO: Replace this with redux
        />
      )}
      keyExtractor={item => item}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.horizontalList}
    />
  );
}

const styles = StyleSheet.create({
  horizontalList: {
    marginBottom: 16,
    height: 50,
  },
});
