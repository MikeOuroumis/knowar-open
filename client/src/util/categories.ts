import {categoryMappings} from '../constants/categories';
import {
  CategoriesMap,
  CategoryInterface,
  ParentCategory,
} from '../types/categories';

const initializeCategoriesMap = (): CategoriesMap => {
  return {
    [ParentCategory.ArtsAndEntertainment]: [],
    [ParentCategory.ScienceAndTechnology]: [],
    [ParentCategory.HistoryAndGeography]: [],
    [ParentCategory.SportsAndGames]: [],
    [ParentCategory.Miscellaneous]: [],
  };
};

export function categorizeCategories(
  categories: CategoryInterface[],
): CategoriesMap {
  const categoriesMap = initializeCategoriesMap();

  categories.forEach(category => {
    const parentCategory =
      categoryMappings[category.name] || ParentCategory.Miscellaneous;
    categoriesMap[parentCategory].push(category);
  });

  return categoriesMap;
}
