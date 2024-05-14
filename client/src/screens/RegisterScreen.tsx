import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Input from '../components/common/Input';
import {ButtonComponent} from '../components/common';
import {LinearGradient} from 'react-native-linear-gradient';
import {LoginScreenBg} from '../assets/images';
import {colorList} from '../constants/colors';
import {useRegisterUser} from '../hooks/useRegisterUser';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, UnauthenticatedScreens} from '../types/navigation';

export default function RegisterScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const {registerHandler, isLoading} = useRegisterUser(
    userName,
    email,
    password,
  );

  const loginText = (
    <Text
      style={styles.hereText}
      onPress={() => navigation.navigate(UnauthenticatedScreens.LoginScreen)}>
      here
    </Text>
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={LoginScreenBg}
        style={styles.globalView}
        resizeMode="cover">
        <LinearGradient
          colors={['transparent', colorList.darkBackgroundBlue]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Input
            placeholder="Username"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={colorList.neonPink}
            onChangeText={setUserName}
          />
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
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <ButtonComponent
            title="Register"
            onPress={registerHandler}
            style={styles.button}
            isLoading={isLoading}
          />
          <View style={styles.footerText}>
            <Text style={styles.loginText}>
              Do you already have an account? Login{' '}
            </Text>
            {loginText}
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
  container: {
    backgroundColor: colorList.darkBackgroundBlue,
    flex: 1,
    justifyContent: 'center',
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
  loginText: {color: '#fff', textAlign: 'center'},
  hereText: {
    color: colorList.neonPink,
    fontWeight: 'bold',
  },
});
