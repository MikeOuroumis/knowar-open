import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import ButtonComponent from './ButtonComponent'; // Adjust the import path
import {colorList} from '../../constants/colors';

describe('ButtonComponent', () => {
  it('renders correctly with given title', () => {
    const {getByText} = render(
      <ButtonComponent onPress={() => {}} title="Press Me" />,
    );

    expect(getByText('Press Me')).toBeTruthy();
  });

  it('handles onPress event', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ButtonComponent onPress={onPressMock} title="Press Me" />,
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('displays loading indicator when isLoading is true', () => {
    const {getByTestId, queryByText} = render(
      <ButtonComponent onPress={() => {}} title="Press Me" isLoading />,
    );

    expect(getByTestId('activity-indicator')).toBeTruthy();
    expect(queryByText('Press Me')).toBeNull();
  });

  it('applies disabled style and prevents onPress when disabled', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(
      <ButtonComponent onPress={onPressMock} title="Press Me" disabled />,
    );

    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).not.toHaveBeenCalled();
    const buttonElement = getByText('Press Me').parent;
    expect(buttonElement).toHaveStyle('disabled');
  });

  it('applies correct styles based on variant', () => {
    const {getByText, rerender} = render(
      <ButtonComponent onPress={() => {}} title="Press Me" variant="default" />,
    );

    let buttonElement = getByText('Press Me').parent;
    expect(buttonElement.parent).toHaveStyle({shadowColor: colorList.softPink});

    rerender(
      <ButtonComponent onPress={() => {}} title="Press Me" variant="bluish" />,
    );
    buttonElement = getByText('Press Me').parent;
    expect(buttonElement.parent).toHaveStyle({
      shadowColor: colorList.electricBlue,
    });
  });
});
