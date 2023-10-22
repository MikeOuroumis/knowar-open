import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import LoadingScreen from './LoadingScreen';
import {AuthContext} from '../store/auth-context';
import {apiUrl} from '../constants/constants';
import backgroundImage from '../assets/images/loginScreen_bg.png';
import {ImageBackground} from 'react-native';
import {COLOR_LIST} from '../constants/colors';
import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const loginHandler = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}:5000/login-user`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: 'application.json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({email, password}),
      });
      const data = await response.json();

      if (data.status === 'ok') {
        authCtx.authenticate(
          data.data.token,
          data.data.email,
          data.data.userName,
          data.data.userId,
        );
        await AsyncStorage.setItem('token', JSON.stringify(data.data));
        await AsyncStorage.setItem('loggedIn', JSON.stringify(true));
        navigation.navigate('AuthenticatedStack');
      } else {
        Alert.alert('Login Failed', 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const registerText = (
    <Text
      style={styles.hereText}
      onPress={() => navigation.navigate('RegisterScreen')}>
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
  container: {
    backgroundColor: COLOR_LIST.darkBackgroundBlue,
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
    color: COLOR_LIST.neonPink,
    fontWeight: 'bold',
  },
});
