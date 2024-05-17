import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {colorList} from '../../constants/colors';

interface ParentCategoryButtonProps {
  item: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function ParentCategoryButton({
  item,
  selectedCategory,
  onSelectCategory,
}: ParentCategoryButtonProps) {
  const isSelected = item === selectedCategory;

  return (
    <TouchableOpacity
      key={item}
      style={styles.buttonWrapper}
      // TODO: Replace onSelectCategory with redux
      onPress={() => onSelectCategory(item)}>
      {isSelected ? (
        <LinearGradient
          colors={[colorList.vibrantCyan, colorList.electricBlue]}
          style={styles.selectedCategoryButton}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <Text style={styles.selectedCategoryButtonText}>{item}</Text>
        </LinearGradient>
      ) : (
        <View style={styles.categoryButton}>
          <Text style={styles.unselectedCategoryButtonText}>{item}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonWrapper: {
    marginRight: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: colorList.vibrantCyan,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  selectedCategoryButton: {
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    borderWidth: 2,
  },
  selectedCategoryButtonText: {
    textAlign: 'center',
    color: colorList.black,
    fontSize: 16,
    fontWeight: '700',
  },
  unselectedCategoryButtonText: {
    textAlign: 'center',
    color: colorList.vibrantCyan,
    fontSize: 16,
  },
});
