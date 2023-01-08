import {FC, useEffect} from "react";
import {View, Text, Stack} from "native-base";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {AuthorPage} from "../AuthorPage";
import { login } from "../utils/doLogin";

interface KeycloakLoginComponentProps  {
    issuer:string,
    clientId:string,
    realm:string
}


export const KeycloakLoginComponent:FC<KeycloakLoginComponentProps> = ({issuer,realm,clientId})=>{
    const accessToken = useAppSelector(state=>state.commonReducer.accessToken)

    useEffect(()=>{
        if(accessToken.length==0){
            login(issuer)
        }
    },[])

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
