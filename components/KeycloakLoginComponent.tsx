import React, {FC, useEffect, useState} from 'react';
import {View, Text, Stack} from 'native-base';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {DarkTheme, NavigationContainer, useLinkTo, useNavigation} from '@react-navigation/native';
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
  const navigate = useLinkTo()

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

    doLogin();
  }, [state]);

  const doLogin = async () => {
    if (keycloak) {
      const res = await InAppBrowser.isAvailable();
      if (res) {
        keycloak.login().then(c => {
          axios.defaults.headers.Authorization = `Bearer ${keycloak.token}`;
          axios.defaults.headers['Content-Type'] = 'application/json';
          dispatch(setAccessToken(keycloak.token as string));
        }).catch(e=>{
          navigate('/Login')
        })
      }
    }
  }

  if (axios.defaults.headers.Authorization === undefined) {
    return (
        <View style={styles.widthHeigh}>
          <Text>Loading...</Text>
        </View>
    );
  }



  return (<MainApp/>)
};
