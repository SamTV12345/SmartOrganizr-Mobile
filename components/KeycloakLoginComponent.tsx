import {exchangeCodeAsync, useAutoDiscovery,} from "expo-auth-session";
import {FC, useEffect} from "react";
import {makeRedirectUri, useAuthRequest} from "expo-auth-session";
import {View, Text, Stack} from "native-base";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setAccessToken} from "../slices/CommonSlice";
import axios from "axios";
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AuthorPage} from "../AuthorPage";

interface KeycloakLoginComponentProps  {
    issuer:string,
    clientId:string,
    realm:string
}


export const KeycloakLoginComponent:FC<KeycloakLoginComponentProps> = ({issuer,realm,clientId})=>{
    const discovery = useAutoDiscovery(issuer+"/realms/"+realm);
    const dispatch = useAppDispatch()
    const accessToken = useAppSelector(state=>state.commonReducer.accessToken)

    const useProxy = false;
    const redirectUri = makeRedirectUri({
        useProxy,
    })

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: 'website',
            scopes: ['openid', 'profile', 'email', 'offline_access'],
            redirectUri: redirectUri
        },
        discovery
    )

    useEffect(()=>{
        if(request?.url!==undefined){
            promptAsync()
        }
    },[request])

    useEffect( () => {
        if (response?.type === 'success' && discovery && request) {
            exchangeCodeAsync({code: response?.params.code, redirectUri, clientId: clientId,
                extraParams:{code_verifier: request.codeVerifier as string}}, discovery)
                .then((resp) => {
                        axios.defaults.headers["Authorization"] = `Bearer ${resp.accessToken}`
                        axios.defaults.headers['Content-Type']  = 'application/json'
                    dispatch(setAccessToken(resp.accessToken))
                }
                )
        }
    }, [response])

    function SettingsScreen() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }

    function SettingsScreen2() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
            </View>
        );
    }

    useEffect(()=>{
        console.log(accessToken)
    }, [accessToken])

    const Tab = createBottomTabNavigator();

    return  <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator>
                <Tab.Screen name="Autor*in" component={AuthorPage}  />
                <Tab.Screen name="Settings" component={SettingsScreen} />
                <Tab.Screen name="Settings2" component={SettingsScreen2} />
            </Tab.Navigator>
    </NavigationContainer>
}
