import React from 'react';
import {Button} from 'react-native';

export default function CategoryBox(props) {
  return <Button title={props.title} onPress={props.onPress} color="#2563eb" />;
}
