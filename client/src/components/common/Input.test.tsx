import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Input from './Input'; // Adjust the path according to your project structure

describe('Input Component', () => {
  it('renders correctly with given props', () => {
    const {getByTestId} = render(<Input placeholder="Enter text" />);
    const textInput = getByTestId('text-input');
    expect(textInput).toBeTruthy();
  });

  it('applies styles correctly', () => {
    const customStyle = {borderColor: 'blue'};
    const {getByTestId} = render(
      <Input placeholder="Enter text" style={customStyle} />,
    );
    const textInput = getByTestId('text-input');
    expect(textInput.props.style).toContainEqual(customStyle);
  });

  it('displays the correct placeholder', () => {
    const placeholder = 'Enter your name';
    const {getByPlaceholderText} = render(<Input placeholder={placeholder} />);
    const textInput = getByPlaceholderText(placeholder);
    expect(textInput).toBeTruthy();
  });

  it('calls onChangeText when text is changed', () => {
    const handleChangeText = jest.fn();
    const {getByTestId} = render(
      <Input placeholder="Enter text" onChangeText={handleChangeText} />,
    );
    const textInput = getByTestId('text-input');
    fireEvent.changeText(textInput, 'new text');
    expect(handleChangeText).toHaveBeenCalledWith('new text');
  });

  it('supports secureTextEntry prop', () => {
    const {getByTestId} = render(
      <Input placeholder="Enter password" secureTextEntry={true} />,
    );
    const textInput = getByTestId('text-input');
    expect(textInput.props.secureTextEntry).toBe(true);
  });

  it('applies custom placeholderTextColor', () => {
    const placeholderTextColor = 'red';
    const {getByTestId} = render(
      <Input
        placeholder="Enter text"
        placeholderTextColor={placeholderTextColor}
      />,
    );
    const textInput = getByTestId('text-input');
    expect(textInput.props.placeholderTextColor).toBe(placeholderTextColor);
  });

  it('supports keyboardType prop', () => {
    const keyboardType = 'email-address';
    const {getByTestId} = render(
      <Input placeholder="Enter email" keyboardType={keyboardType} />,
    );
    const textInput = getByTestId('text-input');
    expect(textInput.props.keyboardType).toBe(keyboardType);
  });
});
