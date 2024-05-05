import {GameScreenParams} from '../screens/GameScreen';

export enum InitialScreens {
  SplashScreen = 'SplashScreen',
  LoadingScreen = 'LoadingScreen',
}

export enum AuthenticatedScreens {
  MainMenuScreen = 'MainMenuScreen',
  MultiplayerLobbyScreen = 'MultiplayerLobbyScreen',
  GameScreen = 'GameScreen',
  CreateGameScreen = 'CreateGameScreen',
  SinglePlayerCreateGameScreen = 'SinglePlayerCreateGameScreen',
  AccountScreen = 'AccountScreen',
}

export enum UnauthenticatedScreens {
  LoginScreen = 'LoginScreen',
  RegisterScreen = 'RegisterScreen',
}

export type RootStackParamList = {
  [InitialScreens.SplashScreen]: undefined;
  [InitialScreens.LoadingScreen]: undefined;
  [AuthenticatedScreens.MainMenuScreen]: undefined;
  [AuthenticatedScreens.MultiplayerLobbyScreen]: undefined;
  [AuthenticatedScreens.GameScreen]: GameScreenParams;
  [AuthenticatedScreens.CreateGameScreen]: undefined;
  [AuthenticatedScreens.SinglePlayerCreateGameScreen]: undefined;
  [AuthenticatedScreens.AccountScreen]: undefined;
  [UnauthenticatedScreens.LoginScreen]: undefined;
  [UnauthenticatedScreens.RegisterScreen]: undefined;
};
