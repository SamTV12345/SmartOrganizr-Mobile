import {AuthorPage} from "./AuthorPage";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SettingsScreen2} from "./components/SetttingsScreen";
import {SettingsScreen} from "./components/SettingsScreen";
import { Icon } from "native-base";
import {Path} from "react-native-svg";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
export const MainApp = () => {
    const Tab = createBottomTabNavigator();

    const getPersonIcon: ((props: {focused: boolean, color: string, size: number}) => React.ReactNode) | undefined = ({ focused, color, size }) => {

        return <Icon style={{width: size, height: size}}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
        </Icon>
    }

    const getSettingsIcon: ((props: {focused: boolean, color: string, size: number}) => React.ReactNode) | undefined = ({ focused, color, size }) => {
        return <Icon style={{width:size, height: size}}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <Path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </Icon>
    }

    const getNotesIcon: ((props: {focused: boolean, color: string, size: number}) => React.ReactNode) | undefined = ({ focused, color, size }) => {
        return <Icon style={{width:size, height: size}}>
                <Path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </Icon>
    }


    return (
        <Tab.Navigator>
            <Tab.Screen name="Autor:in" component={AuthorPage} options={{headerShown: false,tabBarIcon:getPersonIcon}} />
            <Tab.Screen name="Noten" component={SettingsScreen} options={{headerShown: false,tabBarIcon: getNotesIcon}}/>
            <Tab.Screen name="Misc" component={SettingsScreen2} options={{headerShown: false,  tabBarIcon:getSettingsIcon}}/>
        </Tab.Navigator>
    )
}
