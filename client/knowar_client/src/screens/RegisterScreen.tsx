import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import {LinearGradient} from 'react-native-linear-gradient';
import backgroundImage from '../assets/images/loginScreen_bg.png';
import {COLOR_LIST} from '../constants/colors';
import {useRegisterUser} from '../hooks/useRegisterUser';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList, UnauthenticatedScreens} from '../types/navigation';

export default function RegisterScreen() {
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
        source={backgroundImage}
        style={styles.globalView}
        resizeMode="cover">
        <LinearGradient
          colors={['transparent', COLOR_LIST.darkBackgroundBlue]}
          style={styles.linearGradient}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}>
          <Input
            placeholder="Username"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={COLOR_LIST.neonPink}
            onChangeText={setUserName}
          />
          <Input
            placeholder="Email"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={COLOR_LIST.neonPink}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Input
            placeholder="Password"
            style={styles.input}
            textStyle={styles.inputText}
            placeholderTextColor={COLOR_LIST.neonPink}
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
    backgroundColor: COLOR_LIST.darkBackgroundBlue,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: COLOR_LIST.white,
    shadowColor: COLOR_LIST.white,
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
    color: COLOR_LIST.neonPink,
    fontWeight: 'bold',
  },
});
