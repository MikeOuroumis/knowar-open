import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import {CategoryInterface} from '../../types/categories';
import {categorizeCategories} from '../../util/categories';
import ParentCategoriesList from './ParentCategoriesList';
import ChildCategoriesList from './ChildCategoriesList';
import {colorList} from '../../constants/colors';

interface CategoryListProps {
  categories: CategoryInterface[];
  onCategorySelect: (category: CategoryInterface) => void;
}

export default function CategoriesList({
  categories,
  onCategorySelect,
}: CategoryListProps) {
  const categorizedCategories = categorizeCategories(categories);
  const parentCategories = Object.keys(categorizedCategories);

  const [selectedParentCategory, setSelectedParentCategory] = useState<string>(
    parentCategories[0],
  );
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryInterface | null>(null);

  const handleSelectParentCategory = (category: string) => {
    setSelectedParentCategory(category);
    setSelectedCategory(null);
  };

  const handleSelectCategory = (category: CategoryInterface) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your category!</Text>
      <ParentCategoriesList
        parentCategories={parentCategories}
        selectedCategory={selectedParentCategory}
        onSelectCategory={handleSelectParentCategory}
      />
      <ChildCategoriesList
        categories={categorizedCategories[selectedParentCategory]}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  title: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: colorList.white,
    textAlign: 'center',
  },
});
