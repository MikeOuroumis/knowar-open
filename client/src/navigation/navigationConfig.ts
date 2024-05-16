import {
  LoginScreen,
  RegisterScreen,
  CreateGameScreen,
  MainMenuScreen,
  MultiplayerLobbyScreen,
  GameScreen,
  AccountScreen,
  SplashScreen,
} from '../screens';
import {
  AuthenticatedScreens,
  UnauthenticatedScreens,
  InitialScreens,
} from '../types/navigation';

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
