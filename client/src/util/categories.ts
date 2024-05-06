import {CategoryInterface} from '../types/category';

type CategoryMap = {
  [key: string]: number;
};

export function getCategoryInfo(
  categoryName: string | null,
  categories: CategoryInterface[],
) {
  const categoriesMap = categories.reduce(
    (categoryMap: CategoryMap, category) => {
      categoryMap[category.name] = category.id;
      return categoryMap;
    },
    {},
  );

  if (!categoryName) {
    return null;
  }

  const categoryId = categoriesMap[categoryName];
  return {id: categoryId, name: categoryName};
}
