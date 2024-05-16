import {FlatList, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {colorList} from '../../constants/colors';

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
        <TouchableOpacity
          key={item}
          style={[
            styles.categoryButton,
            item === selectedCategory && styles.selectedCategoryButton,
          ]}
          onPress={() => onSelectCategory(item)}>
          <Text
            style={[
              styles.categoryButtonText,
              item === selectedCategory
                ? styles.selectedCategoryButtonText
                : styles.unselectedCategoryButtonText,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
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
  categoryButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: colorList.electricBlue,
    borderWidth: 2,
    borderRadius: 20,
    marginRight: 10,
    justifyContent: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: colorList.electricBlue,
  },
  categoryButtonText: {
    fontSize: 16,
  },
  selectedCategoryButtonText: {
    color: colorList.black,
  },
  unselectedCategoryButtonText: {
    color: colorList.electricBlue,
  },
});
