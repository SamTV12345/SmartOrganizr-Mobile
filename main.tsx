import {BaseURLSetter} from "./components/BaseURLSetter";
import React, {useEffect} from "react";
import {useAppSelector} from "./store/hooks";
import {View} from "native-base";
import {StyleSheet, Text} from "react-native";
import {KeycloakLoginComponent} from "./components/KeycloakLoginComponent";
import {ReactNativeKeycloakProvider, RNKeycloak} from "@react-keycloak/native";

export const Main = ()=>{
    const keycloakConfig = useAppSelector(state => state.commonReducer.keycloakConfig)

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

    const keycloak= new RNKeycloak({url:"https://pihole.schwanzer.online", clientId: 'website', realm:'master'})

    return <ReactNativeKeycloakProvider authClient={keycloak} initOptions={{redirectUri:'myApp://Homepage'}}>
        <View style={styles.widthHeigh}>
        {!keycloakConfig&&<View style={styles.fullScreen}
                 _dark={{ bg: "black" }}
                 _light={{ bg: "blueGray.50" }}>
        <BaseURLSetter />
    </View>}
        {keycloakConfig && keycloakConfig.url
            !==undefined
            &&
                <KeycloakLoginComponent issuer={keycloakConfig.url} clientId={keycloakConfig.clientId} realm={keycloakConfig.realm}/>
        }
    </View>
    </ReactNativeKeycloakProvider>
}