import {Text, View} from "native-base";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {Page} from "../models/Page";
import {ElementEmbeddedContainer} from "../models/ElementEmbeddedContainer";
import axios from "axios";
import {NoteItem} from "../models/NoteItem";
import {setNotesSearched} from "../slices/CommonSlice";
import {FlatList} from "react-native";
import {SearchBarHeader} from "./SearchBarHeader";
import {NoteListItem} from "./NoteListItem";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import {NoteSearchBarHeader} from "./NoteSearchBarHeader";
import {createStackNavigator} from "@react-navigation/stack";
import {DetailNoteView} from "./DetailNoteView";
import {PDFViewer} from "./PDFViewer";

const Stack = createStackNavigator()

export const SettingsScreen = () => {
    const searchedElements = useAppSelector(state=>state.commonReducer.elementsSearched)
    const dispatch = useAppDispatch()
    const loginURL = useAppSelector(state=>state.commonReducer.loginURL)
    useEffect(()=>{
        if(searchedElements===undefined)
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
            console.log(notesInPage._embedded.noteRepresentationModelList[3])
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
            console.log(notesInPage)
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
                        <FlatList ListHeaderComponent={<NoteSearchBarHeader/>}
                                  data={searchedElements._embedded?searchedElements._embedded.noteRepresentationModelList: []}

                                  onEndReached={() => {
                                      if (searchedElements._links.next !== undefined) {
                                          loadNotes(searchedElements._links.next.href);
                                      }
                                  }}
                                  renderItem={({item}) => (
                                      <NoteListItem item={item} />
                                  )}
                        />
                    )}
                </View>
        )
}


export const NoteStackNavigator = () => {
    return <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={'NotenD'} component={SettingsScreen} />
        <Stack.Screen name={'DetailansichtNote'} component={DetailNoteView} />
        <Stack.Screen name={'PDFViewer'} component={PDFViewer} />
    </Stack.Navigator>
}
