import {shuffle} from './shuffle';

describe('shuffle', () => {
  test('should shuffle the array entries', () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    const originalArr = [...arr];
    shuffle(arr);

    expect(arr).not.toEqual(originalArr);
    expect(arr).toHaveLength(originalArr.length);
    expect(arr).toEqual(expect.arrayContaining(originalArr));
  });

  test('should handle empty array', () => {
    const arr: any[] = [];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toEqual([]);
  });

  test('should handle single element array', () => {
    const arr = [1];
    const shuffledArr = shuffle(arr);
    expect(shuffledArr).toEqual([1]);
  });
});
