import {Button, Container, FormControl, Heading, HStack, Input, Text, View, VStack} from "native-base";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {FindNotePositionModel} from "../models/FindNotePositionModel";
import {setAuthorExtraInformation, setAuthorName} from "../slices/AuthorSlice";
import {setSelectedPDF} from "../slices/CommonSlice";
import {useNavigation} from "@react-navigation/native";

export const DetailNoteView = ()=>{
    const dispatch = useAppDispatch()
    const note = useAppSelector(state=>state.noteReducer.selectedNote)
    const loginURL = useAppSelector(state=>state.commonReducer.loginURL)
    const [noteInformation, setNoteInformation] = useState<FindNotePositionModel>()
    const navigate = useNavigation()
    useEffect(()=> {
        if (note !== null) {
            axios.get(loginURL + `/api/v1/elements/${note?.id}/position`)
                .then(r=>setNoteInformation(r.data))
                .catch(e=>console.log(e))
        }
    },[note])

    if (!note||!noteInformation){
        return <View></View>
    }

    return <View>
        <Text style={{fontSize: 20, textAlign:'center', fontWeight:"500", marginTop: '5%', marginBottom: '4%'}}>{note.title}</Text>
        <Container margin={2}>

            <VStack space={2}>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Autor: </Text>
                    <Text>{note.author.name}</Text>
                </HStack>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Ordner: </Text>
                    <Text>{note.parent.name}</Text>
                </HStack>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Anzahl Seiten: </Text>
                    <Text>{note.numberOfPages||'Unbekannt'}</Text>
                </HStack>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Position: </Text>
                    <Text>{noteInformation?.positionInFolder||'Unbekannt'}</Text>
                </HStack>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Vorherige Stück: </Text>
                    <Text>{noteInformation?.previousNote?noteInformation?.previousNote.title:'Nicht gegeben'}</Text>
                </HStack>
                <HStack space={2}>
                    <Text style={{fontWeight: 'bold'}}>Nächstes Stück: </Text>
                    <Text>{noteInformation?.nextNote?noteInformation?.nextNote.title:'Nicht gegeben'}</Text>
                </HStack>
            </VStack>
            <View><Text>PDF: </Text>{note.pdfAvailable?<Button onPress={()=>{
                axios.get(loginURL+`/api/v1/elements/${note.id}/pdf`)
                    .then(c=>{
                        dispatch(setSelectedPDF(c.data))
                        navigate.navigate('PDFViewer')
                    })
            }}>Öffnen</Button>:<Text>x</Text>}</View>
        </Container>
    </View>
}
