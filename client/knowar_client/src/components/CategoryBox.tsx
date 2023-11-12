import React from 'react';
import {Button} from 'react-native';

interface CategoryBoxProps {
  title: string;
  onPress: () => void;
}

export default function CategoryBox({title, onPress}: CategoryBoxProps) {
  return <Button title={title} onPress={onPress} color="#2563eb" />;
}
