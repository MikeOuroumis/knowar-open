import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert, ImageBackground} from 'react-native';
import {apiUrl} from '../constants/constants';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import {AuthContext} from '../store/auth-context';
import {LinearGradient} from 'react-native-linear-gradient';
import backgroundImage from '../assets/images/loginScreen_bg.png';
import {COLOR_LIST} from '../constants/colors';

export default function RegisterScreen({navigation}) {
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);

  const registerHandler = () => {
    fetch(`${apiUrl}:5000/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Accept: 'application.json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({userName, email, password}),
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          authCtx.authenticate(
            data.token,
            data.email,
            data.userName,
            data.userId,
          );

          navigation.replace('AuthenticatedStack', {
            screen: 'MainMenuScreen',
          });
        } else {
          // Handle error message here
          let errorMessage = data.message || 'Registration failed!'; // Default error message
          if (data.error) {
            errorMessage = data.error; // Server provided error message
          }
          Alert.alert(
            'Registration Error', // Title of the alert
            errorMessage, // Message to display
            [
              {
                text: 'OK',
                onPress: () => console.log('OK Pressed'),
              },
            ],
          );
        }
      })
      .catch(err => {
        console.error('register error', err);
        // Handle fetch error here
        Alert.alert(
          'Network Error',
          'Unable to register at the moment. Please try again later.',
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      });
  };

  const loginText = (
    <Text
      style={styles.hereText}
      onPress={() => navigation.navigate('LoginScreen')}>
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
    backgroundColor: COLOR_LIST.neonPink,
    shadowColor: COLOR_LIST.neonPink,
    shadowOpacity: 1,
    shadowRadius: 20,
    shadowOffset: {
      height: 10,
      width: 10,
    },
    elevation: 10,
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
