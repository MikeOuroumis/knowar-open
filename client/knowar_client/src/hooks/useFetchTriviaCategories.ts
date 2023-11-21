import {useEffect, useState} from 'react';
import axios from 'axios';
import {TRIVIA_CATEGORY_URL} from '../constants/constants';
import {CategoryInterface} from '../types/category';

export const useFetchTriviaCategories = () => {
  const [categories, setCategories] = useState<CategoryInterface[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get(TRIVIA_CATEGORY_URL);
      const data = response.data;
      const fetchedCategories = data.trivia_categories.map(category => ({
        id: category.id,
        name: category.name.replace(/Entertainment: |Science: /g, ''),
      }));
      setCategories(fetchedCategories);
    } catch (err) {
      alert(err);
    }
  }

  return categories;
};
