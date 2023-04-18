import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {PublicModel} from "../models/PublicModel";
import {Page} from "../models/Page";
import {AuthorEmbeddedContainer} from "../models/AuthorEmbeddedContainer";
import {Author} from "../models/Author";
import {ReactNativeKeycloakProvider, RNKeycloak} from "@react-keycloak/native";

interface CommonProps {
    accessToken: string,
    keycloakConfig: PublicModel|undefined,
    authors: Page<AuthorEmbeddedContainer<Author>>|undefined,
    baseURL:string,
    keycloak:  string,
    loginURL: string,
    authorSearchText:string
}

const initialState: CommonProps = {
    accessToken: '',
    keycloakConfig: undefined,
    authors: undefined,
    baseURL:'',
    keycloak: JSON.stringify(new RNKeycloak({realm: "master", url:"", clientId:'website'})),
    loginURL:'',
    authorSearchText: ''
}

export const CommonSlice = createSlice({
        name:'common',
        initialState,
        reducers:{
            setAccessToken:(state, action:PayloadAction<string>)=>{
                state.accessToken = action.payload
            },
            setKeycloakConfig:(state, action:PayloadAction<PublicModel>)=>{
                state.keycloakConfig = action.payload
                state.keycloak = JSON.stringify(new RNKeycloak({realm:state.keycloakConfig.realm, clientId:state.keycloakConfig.clientId, url:state.keycloakConfig.url}))
            },
            setAuthorPage: (state, action:PayloadAction<Page<AuthorEmbeddedContainer<Author>>>) => {
                state.authors = action.payload
            },
            setBaseURL : (state, action:PayloadAction<string>) =>{
                state.baseURL = action.payload
            },
            setLoginURL: (state, action:PayloadAction<string>)=>{
                state.loginURL = action.payload
            },
            setAuthorSearchText: (state, action:PayloadAction<string>)=>{
                state.authorSearchText = action.payload
            }
        }
})


export const {setAccessToken, setAuthorSearchText, setKeycloakConfig, setAuthorPage, setBaseURL, setLoginURL} = CommonSlice.actions
export default CommonSlice.reducer
