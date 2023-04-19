import {FC, useEffect, useState} from "react";
import {Input, View} from "native-base";
import {useDebounce} from "../hooks/DebounceHook";
import {Page} from "../models/Page";
import {AuthorEmbeddedContainer} from "../models/AuthorEmbeddedContainer";
import {Author} from "../models/Author";
import axios from "axios";
import {setAuthorPage, setAuthorSearchText, setNotesSearched} from "../slices/CommonSlice";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {ElementEmbeddedContainer} from "../models/ElementEmbeddedContainer";
import {NoteItem} from "../models/NoteItem";
import {setNoteText} from "../slices/NoteSlice";

type SearchBarHeaderProps = {

}

export const NoteSearchBarHeader: FC<SearchBarHeaderProps> = ()=>{
    const searchText = useAppSelector(state=>state.noteReducer.searchedNoteText)
    const loginUrl = useAppSelector(state=>state.commonReducer.loginURL)
    const dispatch = useAppDispatch()
    const loadNotes = async (link:string)=>{
        const notesInPage: Page<ElementEmbeddedContainer<NoteItem>> = await new Promise<Page<ElementEmbeddedContainer<NoteItem>>>(resolve=>{
            axios.get(link)
                .then(resp=>resolve(resp.data))})
        if(notesInPage !== undefined){
            dispatch(setNotesSearched(notesInPage))
        }
    }

    useEffect(()=>{
        loadNotes(loginUrl+`/api/v1/elements/notes?page=0`)
    },[])

    useDebounce(()=>{
            loadNotes(loginUrl+`/api/v1/elements/notes?page=0&noteName=${searchText}`)
        },
        1000,[searchText])

    return  <View
        style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
        <Input value={searchText} onChangeText={text => dispatch(setNoteText(text))}
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
