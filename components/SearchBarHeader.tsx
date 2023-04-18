import {FC, useState} from "react";
import {Input, View} from "native-base";
import {useDebounce} from "../hooks/DebounceHook";
import {Page} from "../models/Page";
import {AuthorEmbeddedContainer} from "../models/AuthorEmbeddedContainer";
import {Author} from "../models/Author";
import axios from "axios";
import {setAuthorPage, setAuthorSearchText} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";

type SearchBarHeaderProps = {

}

export const SearchBarHeader: FC<SearchBarHeaderProps> = ()=>{
    const searchText = useAppSelector(state=>state.commonReducer.authorSearchText)
    const dispatch = useAppDispatch()
    const loginUrl = useAppSelector(state=>state.commonReducer.loginURL)
    const loadAuthors = async (link:string)=>{
        const authorsInResponse: Page<AuthorEmbeddedContainer<Author>> = await new Promise<Page<AuthorEmbeddedContainer<Author>>>(resolve=>{
            axios.get(link)
                .then(resp=>resolve(resp.data))
                .catch((error)=>{
                    console.log(error)
                })})
        if(authorsInResponse !== undefined){
            dispatch(setAuthorPage(authorsInResponse))
        }
    }


    useDebounce(()=>{
            if(searchText === undefined|| searchText.trim().length===0){
                loadAuthors(loginUrl+`/api/v1/authors?page=0`)
            }
            else{
                loadAuthors(loginUrl+`/api/v1/authors?page=0&name=${searchText}`)
            }

        },
        1000,[searchText])
    return  <View
        style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Input value={searchText} onChangeText={text => dispatch(setAuthorSearchText(text))}
            autoCapitalize='none'
            autoCorrect={false}
            placeholder='Search'
            style={{
                borderRadius: 100,
                borderColor: '#333',
                backgroundColor: '#fff'
            }}
        />
    </View>
}
