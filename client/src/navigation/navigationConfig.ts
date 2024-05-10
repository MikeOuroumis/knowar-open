import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CreateGameScreen from '../screens/CreateGameScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import MultiplayerLobbyScreen from '../screens/MultiplayerLobbyScreen';
import GameScreen from '../screens/GameScreen';
import AccountScreen from '../screens/AccountScreen';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
  InitialScreens,
} from '../types/navigation';
import {SplashScreen} from '../screens/SplashScreen';

export const authenticatedScreens = [
  {name: AuthenticatedScreens.MainMenuScreen, component: MainMenuScreen},
  {
    name: AuthenticatedScreens.MultiplayerLobbyScreen,
    component: MultiplayerLobbyScreen,
  },
  {name: AuthenticatedScreens.CreateGameScreen, component: CreateGameScreen},
  {name: AuthenticatedScreens.GameScreen, component: GameScreen},
  {name: AuthenticatedScreens.AccountScreen, component: AccountScreen},
];

export const unauthenticatedScreens = [
  {name: UnauthenticatedScreens.LoginScreen, component: LoginScreen},
  {name: UnauthenticatedScreens.RegisterScreen, component: RegisterScreen},
];

export const initialScreen = {
  name: InitialScreens.SplashScreen,
  component: SplashScreen,
};
