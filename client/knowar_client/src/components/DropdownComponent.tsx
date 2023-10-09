import React from 'react';
import {StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DropdownComponent({options, onSelectOption}) {
  return (
    <SelectDropdown
      data={options.map(option => option)}
      renderDropdownIcon={() => {
        return <Ionicons name="chevron-down-outline" size={24} color="black" />;
      }}
      buttonStyle={styles.button}
      buttonTextStyle={styles.buttonText}
      onSelect={onSelectOption}
      rowStyle={styles.button}
      rowTextStyle={styles.buttonText}
      dropdownStyle={styles.dropDown}
      buttonTextAfterSelection={selectedItem => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
    />
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    marginHorizontal: 40,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
  },
  dropDown: {
    backgroundColor: '#fff',
    width: '80%',
    justifyContent: 'center',
    alignContent: 'center',
  },
});
