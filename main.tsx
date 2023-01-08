import {BaseURLSetter} from "./components/BaseURLSetter";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "./store/hooks";
import {View} from "native-base";
import {StyleSheet, Text} from "react-native";
import {KeycloakLoginComponent} from "./components/KeycloakLoginComponent";
import {ReactNativeKeycloakProvider, RNKeycloak} from "@react-keycloak/native";

export const Main = ()=>{
    const keycloakConfig = useAppSelector(state => state.commonReducer.keycloakConfig)
    const [state, setState] = useState<RNKeycloak>(()=>
        new RNKeycloak({url:"<url>", clientId: 'clientId', realm:'<realm>'}))
    const loginURL = useAppSelector(state=>state.commonReducer.loginURL)

    const styles = StyleSheet.create({
        fullScreen: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        widthHeigh:{
            width: '100%',
            height: '100%',
        }
    })

    useEffect(()=>{
        if(keycloakConfig!==undefined){
            setState(new RNKeycloak({url:keycloakConfig.url, realm: keycloakConfig.realm, clientId: keycloakConfig.clientId}))
        }
    },[keycloakConfig])


    console.log(keycloakConfig?.clientId)
    return <ReactNativeKeycloakProvider authClient={state} initOptions={{redirectUri: 'smartorganizr://oauth2/redirect'}}>
        <View style={styles.widthHeigh}>
        {!keycloakConfig&&<View style={styles.fullScreen}
                 _dark={{ bg: "black" }}
                 _light={{ bg: "blueGray.50" }}>
        <BaseURLSetter />
    </View>}
        {keycloakConfig && !state.realm?.includes('realm')
            &&
                <KeycloakLoginComponent issuer={keycloakConfig.url} clientId={keycloakConfig.clientId} realm={keycloakConfig.realm}/>
        }
    </View>
    </ReactNativeKeycloakProvider>
}