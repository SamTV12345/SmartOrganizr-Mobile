import {Button, Center, FormControl, Input, Stack, VStack} from "native-base";
import {KeycloakLoginComponent} from "./KeycloakLoginComponent";
import React, {useEffect} from "react";
import {PublicModel} from "../models/PublicModel";
import axios, {AxiosResponse} from "axios";
import {getStorageKey, setStorageKey} from "../storage/SetStorageKey";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setKeycloakConfig} from "../slices/CommonSlice";

export const BaseURLSetter = () => {
    const keycloakConfig = useAppSelector(state => state.commonReducer.keycloakConfig)
    const [loginURL, setLoginURL] = React.useState("");
    const dispatch = useAppDispatch()

    useEffect(()=>{
        getStorageKey("public-url").then((value) => {
                value&&setLoginURL(value);
            }
        )}, [])
    const getPublicURL = async () => {
        axios.get(loginURL+"/api/public")
            .then((resp:AxiosResponse<PublicModel>) => {
                console.log(resp.data)
                dispatch(setKeycloakConfig(resp.data))
                setStorageKey("public-url",loginURL)
            })
    }

    return       <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={4}
        flex={1}
    >
        <VStack space={5} alignItems="center">
            <FormControl isRequired>
                <Stack mx="4">
                    <FormControl.Label>URL zur SmartOrganizr Plattform</FormControl.Label>
                    <Input type="text" value={loginURL} onChangeText={(v)=>setLoginURL(v)} placeholder="https://smartorganizr.com" />
                </Stack>
            </FormControl>
            <Button disabled={loginURL===undefined || loginURL===null} onPress={()=>getPublicURL()}>Test</Button>
        </VStack>
        {keycloakConfig!==undefined
            &&<KeycloakLoginComponent issuer={keycloakConfig.url} clientId={keycloakConfig.clientId} realm={keycloakConfig.realm} />}
    </Center>
}