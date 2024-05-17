import {Pressable, StyleSheet, ViewStyle} from 'react-native';
import {colorList} from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';

interface GoBackArrowProps {
  style?: ViewStyle;
}

export default function GoBackArrow({style}: GoBackArrowProps) {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <Pressable
      testID="go-back-arrow"
      style={[style, styles.backButton]}
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-back" size={30} color={colorList.white} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  backButton: {
    zIndex: 1,
  },
});
