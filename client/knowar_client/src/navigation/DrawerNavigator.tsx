import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useContext} from 'react';
import MainMenuScreen from '../screens/MainMenuScreen';
import MultiplayerLobbyScreen from '../screens/MultiplayerLobbyScreen';
import {AuthContext} from '../store/auth-context';
import {COLORS} from '../constants/colors';
import GameScreen from '../screens/GameScreen';
import CreateGameScreen from '../screens/CreateGameScreen';
import {useLogout} from '../hooks/useLogout';

const Drawer = createDrawerNavigator();

function DrawerIcon({focused, name}) {
  const iconName = focused ? name : `${name}-outline`;
  return <Ionicons name={iconName} size={20} />;
}

export function DrawerNavigator() {
  const authCtx = useContext(AuthContext);
  const logout = useLogout();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: COLORS.lighterGrey},
        headerTintColor: COLORS.black,
        headerTitleStyle: {fontWeight: 'bold'},
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: COLORS.lightBlue,
        drawerActiveTintColor: COLORS.black,
        drawerStyle: {backgroundColor: COLORS.lightGrey},
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Main Menu"
            icon={({focused}) => <DrawerIcon focused={focused} name="home" />}
            onPress={() => props.navigation.navigate('MainMenuScreen')}
            activeTintColor={COLORS.black}
            inactiveTintColor={COLORS.black}
            activeBackgroundColor={COLORS.lightBlue}
          />
          <DrawerItem
            label="Multiplayer"
            icon={({focused}) => <DrawerIcon focused={focused} name="people" />}
            onPress={() => props.navigation.navigate('MultiplayerLobbyScreen')}
            activeTintColor={COLORS.black}
            inactiveTintColor={COLORS.black}
            activeBackgroundColor={COLORS.lightBlue}
          />
          <DrawerItem
            label="Logout"
            icon={({focused}) => (
              <DrawerIcon focused={focused} name="log-out" />
            )}
            onPress={logout}
          />
        </DrawerContentScrollView>
      )}>
      <Drawer.Screen name="MainMenuScreen" component={MainMenuScreen} />
      <Drawer.Screen
        name="MultiplayerLobbyScreen"
        component={MultiplayerLobbyScreen}
      />
      <Drawer.Screen name="GameScreen" component={GameScreen} />
      <Drawer.Screen name="CreateGameScreen" component={CreateGameScreen} />
    </Drawer.Navigator>
  );
}
