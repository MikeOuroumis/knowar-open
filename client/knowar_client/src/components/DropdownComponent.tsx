import SelectDropdown from 'react-native-select-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function DropdownComponent({options, onSelectOption}) {
  return (
    <SelectDropdown
      data={options.map(option => option)}
      renderDropdownIcon={() => {
        return <Ionicons name="chevron-down" size={24} color="black" />;
      }}
      buttonStyle={{
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '80%',
        marginHorizontal: 40,
        height: 50,
        justifyContent: 'center',
        alignContent: 'center',
      }}
      buttonTextStyle={{
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
      }}
      onSelect={onSelectOption}
      rowStyle={{
        backgroundColor: '#fff',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      }}
      rowTextStyle={{
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
      }}
      dropdownStyle={{
        backgroundColor: '#fff',
        width: '80%',
        justifyContent: 'center',
        alignContent: 'center',
      }}
      buttonTextAfterSelection={selectedItem => {
        // text represented after item is selected
        // if data array is an array of objects then return selectedItem.property to render after item is selected
        return selectedItem;
      }}
    />
  );
}
