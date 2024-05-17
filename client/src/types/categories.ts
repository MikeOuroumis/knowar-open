export interface CategoryInterface {
  id: string;
  name: string;
}

export enum ParentCategory {
  ArtsAndEntertainment = 'Arts and Entertainment',
  ScienceAndTechnology = 'Science and Technology',
  HistoryAndGeography = 'History and Geography',
  SportsAndGames = 'Sports and Games',
  Miscellaneous = 'Miscellaneous',
}

export interface CategoriesMap {
  [ParentCategory.ArtsAndEntertainment]: CategoryInterface[];
  [ParentCategory.ScienceAndTechnology]: CategoryInterface[];
  [ParentCategory.HistoryAndGeography]: CategoryInterface[];
  [ParentCategory.SportsAndGames]: CategoryInterface[];
  [ParentCategory.Miscellaneous]: CategoryInterface[];
}
