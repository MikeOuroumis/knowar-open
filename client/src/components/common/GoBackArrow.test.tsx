import {useNavigation} from '@react-navigation/native';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import GoBackArrow from './GoBackArrow';

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

describe('GoBackArrow', () => {
  test('renders correctly', () => {
    const {getByTestId} = render(<GoBackArrow />);

    expect(getByTestId).toBeTruthy;
  });

  test('calls navigation.goBack when pressed', () => {
    const goBackMock = jest.fn();

    (useNavigation as jest.Mock).mockReturnValue({goBack: goBackMock});

    const {getByTestId} = render(<GoBackArrow />);

    fireEvent.press(getByTestId('go-back-arrow'));
    expect(goBackMock).toHaveBeenCalled;
  });
});
