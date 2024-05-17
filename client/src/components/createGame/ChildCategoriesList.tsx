import {FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {CategoryInterface} from '../../types/categories';
import CategoryCard from './CategoryCard';

interface ChildCategoriesListProps {
  categories: CategoryInterface[];
  selectedCategory: CategoryInterface | null;
  onSelectCategory: (category: CategoryInterface) => void;
}

export default function ChildCategoriesList({
  categories,
  selectedCategory,
  onSelectCategory,
}: ChildCategoriesListProps) {
  return (
    <FlatList
      data={categories}
      renderItem={({item}) => (
        <CategoryCard
          category={item}
          isSelected={selectedCategory?.id === item.id}
          onSelect={onSelectCategory}
        />
      )}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.verticalList}
    />
  );
}

const styles = StyleSheet.create({
  verticalList: {
    paddingBottom: 16,
  },
});
