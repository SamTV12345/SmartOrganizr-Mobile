import {Text, View} from "native-base";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {Page} from "../models/Page";
import {ElementEmbeddedContainer} from "../models/ElementEmbeddedContainer";
import axios from "axios";
import {NoteItem} from "../models/NoteItem";
import {setNotesSearched} from "../slices/CommonSlice";
import {FlatList} from "react-native";
import {SearchBarHeader} from "./SearchBarHeader";
import ListItem from "./ListItem";
import {NoteListItem} from "./NoteListItem";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";

export const SettingsScreen = () => {
    const searchedElements = useAppSelector(state=>state.commonReducer.elementsSearched)
    const dispatch = useAppDispatch()
    const navigation = useNavigation()
    const loginURL = useAppSelector(state=>state.commonReducer.loginURL)

    useEffect(()=>{
        loadNotesInitial(loginURL+`/api/v1/elements/notes?page=0`)
    },[])

    const loadNotesInitial = async (link:string)=>{
        const notesInPage: Page<ElementEmbeddedContainer<NoteItem>> = await new Promise<Page<ElementEmbeddedContainer<NoteItem>>>(resolve=>{
            axios.get(link)
                .then(resp=>resolve(resp.data))
                .catch((error)=>{
                    console.log(error)
                })})
        if(notesInPage !== undefined){
            dispatch(setNotesSearched(notesInPage))
        }
    }
    const loadNotes = async (link:string)=>{
        if(searchedElements==null){
            return
        }
        const notesInPage: Page<ElementEmbeddedContainer<NoteItem>> = await new Promise<Page<ElementEmbeddedContainer<NoteItem>>>(resolve=>{
            axios.get(link)
                .then(resp=>resolve(resp.data))
                .catch((error)=>{
                    console.log(error)
                })})
        if(notesInPage !== undefined){
            dispatch(setNotesSearched({
                _embedded: {
                    noteRepresentationModelList:[...searchedElements._embedded.noteRepresentationModelList,...notesInPage._embedded.noteRepresentationModelList]
                },
                page: notesInPage.page,
                _links: notesInPage._links
            } as Page<ElementEmbeddedContainer<NoteItem>>))
        }
    }




        return (
            <View>
                <Text style={{fontSize: 20, textAlign:'center', fontWeight:"500", marginTop: '5%', marginBottom: '4%'}}>Noten</Text>
                    {searchedElements && (
                        <FlatList ListHeaderComponent={<SearchBarHeader/>}
                                  data={searchedElements._embedded?searchedElements._embedded.noteRepresentationModelList: []}

                                  onEndReached={() => {
                                      if (searchedElements._links.next !== undefined) {
                                          loadNotes(searchedElements._links.next.href);
                                      }
                                  }}
                                  renderItem={({item}) => (
                                      <NoteListItem item={item} navigate={navigation} />
                                  )}
                        />
                    )}
                </View>
        )
}
