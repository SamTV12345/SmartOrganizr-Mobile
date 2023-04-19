import {Button, Center, FormControl, Input, Stack, VStack} from "native-base";
import React, {useEffect, useState} from "react";
import {PublicModel} from "../models/PublicModel";
import axios, {AxiosResponse} from "axios";
import {getStorageKey, setStorageKey} from "../storage/SetStorageKey";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {setKeycloakConfig, setLoginURL} from "../slices/CommonSlice";
import {useLinkTo, useNavigation} from "@react-navigation/native";

export const BaseURLSetter = () => {
    const loginURL = useAppSelector(state=>state.commonReducer.loginURL)
    const dispatch = useAppDispatch()
    const keycloakConfig = useAppSelector(state=>state.commonReducer.keycloakConfig)
    const navigate = useLinkTo()


    useEffect(()=>{
        getStorageKey("public-url").then((value) => {
                value&&dispatch(setLoginURL(value))
            }
        )}, [])
    const getPublicURL = async () => {
        axios.get(loginURL+"/api/public")
            .then((resp:AxiosResponse<PublicModel>) => {
                dispatch(setKeycloakConfig(resp.data))
                setStorageKey("public-url",loginURL)
                navigate('/KeycloakLoginComponent')
            })
    }

    useEffect(()=>{
        if (keycloakConfig){

        }
    },[keycloakConfig])

    return       <Center
        _dark={{ bg: "blueGray.900" }}
        _light={{ bg: "blueGray.50" }}
        px={2}
        flex={1}
    >
        <VStack space={5} alignItems="center">
            <FormControl isRequired>
                <Stack mx="4" style={{width: '110%'}}>
                    <FormControl.Label>URL zur SmartOrganizr Plattform</FormControl.Label>
                    <Input type="text" value={loginURL} style={{width: '90%'}} onChangeText={(v)=>dispatch(setLoginURL(v))} placeholder="https://smartorganizr.com" />
                </Stack>
            </FormControl>
            <Button disabled={loginURL===undefined || loginURL===null} onPress={()=>getPublicURL()}>Login</Button>
        </VStack>
    </Center>
}
