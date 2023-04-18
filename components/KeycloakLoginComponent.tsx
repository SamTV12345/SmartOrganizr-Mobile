import React, {FC, useEffect, useState} from 'react';
import {View, Text, Stack} from 'native-base';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AuthorPage} from '../AuthorPage';
import {
  ReactNativeKeycloakProvider,
  RNKeycloak,
  useKeycloak,
} from '@react-keycloak/native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {setAccessToken} from '../slices/CommonSlice';
import axios from 'axios';
import {BaseURLSetter} from "./BaseURLSetter";
import {StyleSheet} from "react-native";
import {MainApp} from "../MainApp";

export interface KeycloakLoginComponentProps {
  issuer: string;
  clientId: string;
  realm: string;
}

interface KeycloakLoginComponentProp{

}

export const KeycloakLoginComponent: FC<KeycloakLoginComponentProp> = () => {
  const accessToken = useAppSelector(state => state.commonReducer.accessToken);
  const {keycloak} = useKeycloak();
  const dispatch = useAppDispatch();
  const keycloakConfig = useAppSelector(state=>state.commonReducer.keycloakConfig)
  const [state, setState] = useState<RNKeycloak>(() => new RNKeycloak({url: '<url>', clientId: 'clientId', realm: '<realm>'}),);

  console.log(keycloakConfig)
  const loginURL = useAppSelector(state => state.commonReducer.loginURL);

  const styles = StyleSheet.create({
    fullScreen: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    widthHeigh: {
      width: '100%',
      height: '100%',
    },
  });

  useEffect(() => {
    if (keycloakConfig !== undefined) {
      console.log("SEtting state")

    }
  }, [keycloakConfig])

  useEffect(() => {

    doLogin();
  }, [state]);

  const doLogin = async () => {
    if (keycloak) {
      const res = await InAppBrowser.isAvailable();
      if (res) {
        keycloak.login().then(c => {
          console.log(keycloak.token);
          axios.defaults.headers.Authorization = `Bearer ${keycloak.token}`;
          axios.defaults.headers['Content-Type'] = 'application/json';
          dispatch(setAccessToken(keycloak.token as string));
        });
      }
    }
  }

  useEffect(() => {
    if (accessToken.length !== 0) {
      console.log('Access token nicht 0');
    }
    console.log('Access Token ist' + accessToken.length);
    console.log(accessToken);
  }, [accessToken]);


  return (

        <View style={styles.widthHeigh}>
          <MainApp/>
        </View>
  )
};
