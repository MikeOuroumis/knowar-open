import {StyleSheet, Text, Pressable} from 'react-native';
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
    <Pressable
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={() => onSelect(category)}>
      <Text style={styles.text}>{category.name}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: colorList.electricBlue,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 20,
    alignItems: 'center',
    backgroundColor: colorList.black,
    shadowColor: colorList.electricBlue,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10,
  },
  selectedContainer: {
    backgroundColor: colorList.electricBlue,
  },
  text: {
    color: colorList.white,
    fontSize: 20,
  },
});
