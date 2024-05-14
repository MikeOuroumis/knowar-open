import {useCallback, useContext, useState} from 'react';
import {AuthService, KeychainService} from '../services';
import {AuthContext} from '../store/authContext';
import {Alert} from 'react-native';

export default function useDeleteAccount() {
  const [loading, setLoading] = useState(false);
  const {userId, logout} = useContext(AuthContext);

  const deleteAccount = useCallback(() => {
    const confirmDelete = async () => {
      setLoading(true);

      try {
        const response = await AuthService.deleteUser(userId);
        if (response.status === 'ok') {
          KeychainService.removeCredentials();
          Alert.alert(
            'Success',
            'Your account has been successfully deleted.',
            [{text: 'OK', onPress: () => logout()}],
          );
        } else {
          throw new Error('Failed to delete the account.');
        }
      } catch (error) {
        console.error('Failed to delete the account', error);
      } finally {
        setLoading(false);
      }
    };

    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account?',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Yes', onPress: confirmDelete},
      ],
      {cancelable: false},
    );
  }, [userId, logout]);

  return {
    deleteAccount,
    loading,
  };
}
