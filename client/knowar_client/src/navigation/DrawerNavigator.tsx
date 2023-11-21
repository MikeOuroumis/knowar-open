import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MainMenuScreen from '../screens/MainMenuScreen';
import MultiplayerLobbyScreen from '../screens/MultiplayerLobbyScreen';
import {COLOR_LIST} from '../constants/colors';
import GameScreen from '../screens/GameScreen';
import CreateGameScreen from '../screens/CreateGameScreen';
import {useLogout} from '../hooks/useLogout';
import {SinglePlayerCreateGameScreen} from '../screens/SinglePlayerCreateGameScreen';

const Drawer = createDrawerNavigator();

function DrawerIcon({focused, name}) {
  const iconName = focused ? name : `${name}-outline`;
  return <Ionicons name={iconName} size={20} color={COLOR_LIST.neonPink} />;
}

export function DrawerNavigator() {
  const logout = useLogout();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true, // Show the header
        headerStyle: {backgroundColor: '#000'},
        headerTintColor: COLOR_LIST.neonPink,
        headerTitle: '',
        drawerActiveBackgroundColor: 'transparent',
        drawerActiveTintColor: COLOR_LIST.black,
        drawerStyle: {backgroundColor: 'transparent'},
        overlayColor: 'rgba(0, 0, 0, 0.7)',
      }}
      drawerContent={props => (
        <DrawerContentScrollView {...props}>
          <DrawerItem
            label="Main Menu"
            icon={({focused}) => <DrawerIcon focused={focused} name="home" />}
            onPress={() => props.navigation.navigate('MainMenuScreen')}
            activeTintColor={COLOR_LIST.neonPink}
            inactiveTintColor={COLOR_LIST.neonPink}
          />
          <DrawerItem
            label="Multiplayer"
            icon={({focused}) => <DrawerIcon focused={focused} name="people" />}
            onPress={() => props.navigation.navigate('MultiplayerLobbyScreen')}
            activeTintColor={COLOR_LIST.neonPink}
            inactiveTintColor={COLOR_LIST.neonPink}
          />
          <DrawerItem
            label="Logout"
            icon={({focused}) => (
              <DrawerIcon focused={focused} name="log-out" />
            )}
            activeTintColor={COLOR_LIST.neonPink}
            inactiveTintColor={COLOR_LIST.neonPink}
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
      <Drawer.Screen
        name="SinglePlayerCreateGameScreen"
        component={SinglePlayerCreateGameScreen}
      />
    </Drawer.Navigator>
  );
}
