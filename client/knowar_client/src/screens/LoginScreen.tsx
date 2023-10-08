import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import ButtonComponent from '../components/ButtonComponent';
import LoadingScreen from './LoadingScreen';
import {AuthContext} from '../store/auth-context';
import {apiUrl} from '../constants/constants';

export default function LoginScreen(props) {
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
        props.navigation.navigate('AuthenticatedStack');
      } else {
        Alert.alert('Login Failed', 'Invalid Credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingScreen text={'Logging In...'} />;
  }

  const registerText = (
    <Text
      style={{color: '#2563eb'}}
      onPress={() => props.navigation.navigate('RegisterScreen')}>
      here
    </Text>
  );

  return (
    <View style={styles.globalView}>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={setEmail}
        />
        <Input
          placeholder="Password"
          keyboardType="default"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <ButtonComponent title="Login" onPress={loginHandler} />
        <View style={styles.footerText}>
          <Text style={{color: '#fff', textAlign: 'center'}}>
            New user? Register{' '}
          </Text>
          {registerText}
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
