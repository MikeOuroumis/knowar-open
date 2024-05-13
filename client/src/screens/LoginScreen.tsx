import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import backgroundImage from '../assets/images/loginScreen_bg.png';
import {ImageBackground} from 'react-native';
import {colorList} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';
import {useLogin} from '../hooks/useLogin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, UnauthenticatedScreens} from '../types/navigation';

export default function LoginScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {loginHandler, isLoading} = useLogin(email, password);

  const registerText = (
    <Text
      style={styles.hereText}
      onPress={() =>
        navigation.navigate(UnauthenticatedScreens.RegisterScreen)
      }>
      here
    </Text>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.globalView}
        resizeMode="cover">
        <LinearGradient
          colors={['transparent', colorList.darkBackgroundBlue]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Input
            placeholder="Email"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={colorList.neonPink}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={colorList.neonPink}
            keyboardType="default"
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <ButtonComponent
            title="Login"
            textStyle={styles.inputText}
            onPress={loginHandler}
            style={styles.button}
            isLoading={isLoading}
          />
          <View style={styles.footerText}>
            <Text style={styles.registerText}>New user? Register </Text>
            {registerText}
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  globalView: {
    flex: 1,
    width: '100%',
    height: '60%',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
    justifyContent: 'flex-end',
    padding: 10,
  },
  input: {
    backgroundColor: colorList.white,
    shadowColor: colorList.white,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 10,
  },
  container: {
    backgroundColor: colorList.darkBackgroundBlue,
    flex: 1,
    justifyContent: 'center',
  },
  inputText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 50,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  registerText: {color: '#fff', textAlign: 'center'},
  hereText: {
    color: colorList.neonPink,
    fontWeight: 'bold',
  },
});
