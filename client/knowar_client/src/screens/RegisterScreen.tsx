import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {apiUrl} from '../constants/constants';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import {AuthContext} from '../store/auth-context';

export default function RegisterScreen(props) {
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

          props.navigation.replace('AuthenticatedStack', {
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
      style={{color: '#2563eb'}}
      onPress={() => props.navigation.navigate('LoginScreen')}>
      here
    </Text>
  );

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Input placeholder="Username" onChangeText={setUserName} />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={setPassword}
        />
        <ButtonComponent title="Register" onPress={registerHandler} />
        <View style={styles.footerText}>
          <Text style={{color: '#fff'}}>
            Do you already have an account? Login{' '}
          </Text>
          {loginText}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  globalView: {
    flex: 1,
  },
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    padding: 20,
    color: '#2563eb',
    marginBottom: 70,
    fontWeight: '300',
    fontSize: 25,
  },
  footerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },
});
