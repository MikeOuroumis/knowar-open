import {getCategoryIdAndName} from '../../../util/categories';

const mockCategories = [
  {id: 9, name: 'General Knowledge'},
  {id: 10, name: 'Books'},
  {id: 11, name: 'Film'},
  {id: 12, name: 'Music'},
];

describe('getCategoryIdAndName', () => {
  test('should return an object with id and name of the category', () => {
    const result = getCategoryIdAndName('Film', mockCategories);
    expect(result).toEqual({id: 11, name: 'Film'});
  });

  test('should return null', () => {
    const result = getCategoryIdAndName(null, mockCategories);
    expect(result).toEqual(null);
  });
});
