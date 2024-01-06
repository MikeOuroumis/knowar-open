import {useCallback, useContext, useState} from 'react';
import {deleteUser} from '../api/userService';
import {AuthContext} from '../store/auth-context';
import {Alert} from 'react-native';

export function useDeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {userId, logout} = useContext(AuthContext);

  const deleteAccount = useCallback(() => {
    const confirmDelete = () => {
      setLoading(true);
      setError(null);

      deleteUser(userId)
        .then(response => {
          if (response.status === 'ok') {
            Alert.alert(
              'Success',
              'Your account has been successfully deleted.',
              [{text: 'OK', onPress: () => logout()}],
            );
          } else {
            throw new Error('Failed to delete the account.');
          }
        })
        .catch(err => {
          if (err instanceof Error) {
            setError(err);
          }
        })
        .finally(() => {
          setLoading(false);
        });
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
    error,
  };
}
