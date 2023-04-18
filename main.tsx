import {BaseURLSetter} from './components/BaseURLSetter';
import React, {useEffect, useState} from 'react';
import {useAppSelector} from './store/hooks';
import {View} from 'native-base';
import {StyleSheet} from 'react-native';
import {KeycloakLoginComponent} from './components/KeycloakLoginComponent';
import {ReactNativeKeycloakProvider, RNKeycloak} from '@react-keycloak/native';

export const Main = () => {
  const keycloakConfig = useAppSelector(
    state => state.commonReducer.keycloakConfig,
  );
}
