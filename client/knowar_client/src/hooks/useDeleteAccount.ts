import {useCallback, useContext, useState} from 'react';
import {deleteUser} from '../api/userService';
import {AuthContext} from '../store/auth-context';
import {Alert} from 'react-native';

export function useDeleteAccount() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const {userId, logout} = useContext(AuthContext); // Assuming you have a logout function

  const deleteAccount = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await deleteUser(userId);

      if (response.status === 'ok') {
        Alert.alert('Success', 'Your account has been successfully deleted.', [
          {text: 'OK', onPress: () => logout()},
        ]);
      } else {
        throw new Error('Failed to delete the account.');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [userId, logout]);

  return {
    deleteAccount,
    loading,
    error,
  };
}
