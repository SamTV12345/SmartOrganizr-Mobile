import {
    View,
    Text,
    HStack,
    VStack,
    Divider,
    Icon,
    Center,
    Heading,
    Container,
    Input,
    FormControl,
    Button
} from "native-base";
import {FC, useEffect} from "react";
import axios from "axios";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {NoteItem} from "../models/NoteItem";
import {setAuthorExtraInformation, setAuthorName, setSelectedAuthorNotes} from "../slices/AuthorSlice";
import React from "react";
import {Author} from "../models/Author";
import {AuthorPatchDto} from "../models/AuthorPatchDto";
import {setAuthorPage} from "../slices/CommonSlice";
import {mergeAuthorInList} from "../utils/AuthorUtilList";
import {fixProtocol} from "../utils/ProtocolUtils";

interface DetailAuthorViewProps {
    route: any,
    navigation:any
}
export const DetailAuthorView:FC<DetailAuthorViewProps> = ({ route, navigation })=>{
    const dispatch = useAppDispatch()
    const baseURL = useAppSelector(state => state.commonReducer.baseURL)
    const selectedAuthor = useAppSelector(state=>state.authorReducer.selectedAuthor)
    const selectedAuthorsNotes = useAppSelector(state=>state.authorReducer.selectedAuthorNotes)
    const authorPage  = useAppSelector(state=>state.commonReducer.authors)

    const loadAuthorNotes = async (selectedAuthorId:number)=> {
        if(selectedAuthorId=== undefined){
            return
        }
        const authorsInResponse: NoteItem[] = await new Promise<NoteItem[]>(resolve => {
            axios.get(fixProtocol(baseURL)+`/authors/${selectedAuthorId}/notes`)
                .then(resp => resolve(resp.data))
                .catch((error) => {
                    console.log(error)
                })
        })
        if (authorsInResponse !== undefined) {
            dispatch(setSelectedAuthorNotes(authorsInResponse))
        }
    }

    const updateAuthor = async(author:Author)=>{
        const authorInResponse: Author = await new Promise<Author>(resolve=>{
            axios.patch(baseURL+`/authors/${author.id}`,{name: author.name,extraInformation:author.extraInformation} satisfies AuthorPatchDto)
                .then(resp=>resolve(resp.data))
                .catch((error)=>{
                    console.log(error)
                })})
        if(authorInResponse !== undefined && authorPage){
            dispatch(setAuthorPage(mergeAuthorInList(authorPage,author)))
        }
    }

    useEffect(()=>{
        if(selectedAuthor !== undefined){
            loadAuthorNotes(selectedAuthor.id)
        }},[route.params.id])

    return <View>
        <Center>
            <Heading color="white">Author*in {selectedAuthor?.name}</Heading>
    </Center>
        <Container margin={2}>

            <VStack space={2}>
                <HStack space={2}>
                    <FormControl>
                        <FormControl.Label color="white">Name</FormControl.Label>
                        <Input color={"white"} placeholder="Name des Authors" isFullWidth value={selectedAuthor?.name}
                               onChangeText={v=>{dispatch(setAuthorName(v))}} />
                    </FormControl>
                </HStack>
                <HStack space={2}>
                    <FormControl>
                        <FormControl.Label color="white">Weitere Infos</FormControl.Label>
                        <Input color={"white"} placeholder="Extra Information" isFullWidth value={selectedAuthor?.extraInformation}
                               onChangeText={v=>{dispatch(setAuthorExtraInformation(v))}} />
                    </FormControl>
                </HStack>
                <HStack space={2}>
                    <FormControl>
                        <Heading color={"white"}>Noten des Authors</Heading>
                        {
                            selectedAuthorsNotes&&selectedAuthorsNotes.map((note, index)=> <React.Fragment key={index+"Index"}>
                            <HStack>
                                <Text fontSize={"xl"} key={index} color={"white"}>#{index+1}- </Text>
                                <Text fontSize={"xl"} key={index+"name"} color={"white"}>{note.title}</Text>
                            </HStack>

                            </React.Fragment>)
                        }
                    </FormControl>
                </HStack>
            </VStack>
        </Container>
        <Center>
            <Button style={{width:'50%'}} onPress={()=>{
                if(selectedAuthor!==undefined){
                    updateAuthor({id:selectedAuthor.id,name:selectedAuthor.name,extraInformation:selectedAuthor.extraInformation})
            }}}>Speichern</Button>
        </Center>
    </View>

}