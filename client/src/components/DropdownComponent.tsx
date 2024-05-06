import React from 'react';
import {StyleSheet, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface DropdownComponentProps {
  options: string[];
  onSelectOption: (selectedItem: any, index: any) => void;
}

export default function DropdownComponent({
  options,
  onSelectOption,
}: DropdownComponentProps) {
  return (
    <View style={styles.container}>
      <SelectDropdown
        data={options.map(option => option)}
        renderDropdownIcon={() => {
          return (
            <Ionicons name="chevron-down-outline" size={24} color="black" />
          );
        }}
        buttonStyle={styles.button}
        onSelect={onSelectOption}
        rowStyle={styles.rowContainer}
        rowTextStyle={styles.rowText}
        buttonTextAfterSelection={selectedItem => {
          // text represented after item is selected
          // if data array is an array of objects then return selectedItem.property to render after item is selected
          return selectedItem;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '80%',
    height: 50,
    justifyContent: 'center',
  },
  rowContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '100%',
    height: 50,
    justifyContent: 'center',
  },
  dropDown: {
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
  },
  rowText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    alignSelf: 'center',
    marginHorizontal: -20,
  },
});
