import React, {useContext} from 'react';
import ButtonComponent from '../components/ButtonComponent';
import {useLogout} from '../hooks/useLogout';
import {StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../store/auth-context';
import {useDeleteAccount} from '../hooks/useDeleteAccount';
import {COLOR_LIST} from '../constants/colors';

export default function AccountScreen(): JSX.Element {
  const logout = useLogout();
  const {email, userName} = useContext(AuthContext);
  const {deleteAccount} = useDeleteAccount();

  return (
    <View style={styles.globalView}>
      <Text style={styles.centered}>
        <Text style={styles.label}>Username: </Text>
        <Text style={styles.text}>{userName}</Text>
      </Text>
      <Text style={styles.centered}>
        <Text style={styles.label}>Email: </Text>
        <Text style={styles.text}>{email}</Text>
      </Text>

      <ButtonComponent title="Log out" onPress={logout} />
      <ButtonComponent title="Delete Account" onPress={deleteAccount} />
    </View>
  );
}

const styles = StyleSheet.create({
  globalView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLOR_LIST.black,
  },
  centered: {
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    color: COLOR_LIST.white,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    color: COLOR_LIST.neonPink,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
  },
});
