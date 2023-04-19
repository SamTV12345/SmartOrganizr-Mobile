import React, {FC, PropsWithChildren, useEffect, useState} from 'react';
import {NativeBaseProvider, extendTheme} from 'native-base';
import {Provider} from 'react-redux';
import {store} from './store/store';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {StatusBar, StatusBarStyle, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {BaseURLSetter} from "./components/BaseURLSetter";
import {KeycloakLoginComponent} from "./components/KeycloakLoginComponent";
import {useAppSelector} from "./store/hooks";
import {ReactNativeKeycloakProvider, RNKeycloak, useKeycloak} from "@react-keycloak/native";
import axios from "axios";

// Define the config
const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

// extend the theme
export const theme = extendTheme({config});
type MyThemeType = typeof theme;

declare module 'native-base' {
  interface ICustomTheme extends MyThemeType {}
}

const CustomStatusBar = () => {
  const insets = useSafeAreaInsets();

  return (
    <StatusBar
      barStyle="light-content"
      hidden={false}
      backgroundColor="transparent"
      translucent={true}
    />
  );
};


const AppProvider:FC<PropsWithChildren> = () => {

  const Stack = createStackNavigator();
  const keycloakConfig = useAppSelector(state=>state.commonReducer.keycloakConfig)
  const [state, setState] = useState<RNKeycloak>(() => new RNKeycloak({url: '<url>', clientId: 'clientId', realm: '<realm>'}),);


  useEffect(() => {
    if (keycloakConfig !== undefined) {

      setState(
          new RNKeycloak({
            url: keycloakConfig.url,
            realm: keycloakConfig.realm,
            clientId: keycloakConfig.clientId,
          }),
      )
    }
  },[keycloakConfig]
  )

  return <ReactNativeKeycloakProvider autoRefreshToken={true}
      authClient={state}
                                      onTokens={(tokens) => {
                                       if (tokens.refreshToken){
                                         axios.defaults.headers.Authorization = `Bearer ${tokens.refreshToken}`;
                                       }}}
      initOptions={{redirectUri: 'smartorganizr-mobile-dev://Homepage'}}>
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name={'Login'} component={BaseURLSetter}  />
          <Stack.Screen name={'KeycloakLoginComponent'} component={KeycloakLoginComponent}/>
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  </ReactNativeKeycloakProvider>
}

export default function App() {

  return (
    <SafeAreaProvider>
      <Provider store={store}>
            <AppProvider/>
      </Provider>
    </SafeAreaProvider>
  );
}
