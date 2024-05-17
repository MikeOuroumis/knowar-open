import {StyleSheet, View, Text} from 'react-native';
import React, {useState} from 'react';
import {CategoryInterface} from '../../types/categories';
import {categorizeCategories} from '../../util/categories';
import ParentCategoriesList from './ParentCategoriesList';
import ChildCategoriesList from './ChildCategoriesList';
import {colorList} from '../../constants/colors';
import {GoBackArrow} from '../common';

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
    onCategorySelect(null); // TODO: Replace this with redux
  };

  const onSelectCategory = (category: CategoryInterface) => {
    setSelectedCategory(category);
    onCategorySelect(category);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArrowContainer}>
        <GoBackArrow style={styles.arrow} />
        <Text style={styles.title}>Choose your category!</Text>
      </View>

      <ParentCategoriesList
        parentCategories={parentCategories}
        selectedCategory={selectedParentCategory}
        onSelectCategory={handleSelectParentCategory}
      />

      <ChildCategoriesList
        categories={categorizedCategories[selectedParentCategory]}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
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
  titleArrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  arrow: {
    top: 2,
  },
  title: {
    margin: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: colorList.white,
    textAlign: 'center',
  },
});
