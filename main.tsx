import {BaseURLSetter} from "./components/BaseURLSetter";
import React from "react";
import {useAppSelector} from "./store/hooks";
import {View} from "native-base";
import {StyleSheet} from "react-native";
import {KeycloakLoginComponent} from "./components/KeycloakLoginComponent";

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

    return <View style={styles.widthHeigh}>
        {!keycloakConfig&&<View style={styles.fullScreen}
                 _dark={{ bg: "black" }}
                 _light={{ bg: "blueGray.50" }}>
        <BaseURLSetter />
    </View>}
        {keycloakConfig
            !==undefined
            &&<KeycloakLoginComponent issuer={keycloakConfig.url} clientId={keycloakConfig.clientId} realm={keycloakConfig.realm}/>
        }
        </View>
}