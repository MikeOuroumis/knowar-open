import {CategoryInterface} from '../types/category';

export function getCategoryIdAndName(
  categoryName: string | null,
  categories: CategoryInterface[],
) {
  if (!categoryName) return null;

  return categories.find(category => category.name === categoryName);
}
