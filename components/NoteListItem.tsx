import {FC} from "react";
import {useAppDispatch} from "../store/hooks";
import {Icon, Pressable, Text, View} from "native-base";
import {setAuthor} from "../slices/AuthorSlice";
import {Path} from "react-native-svg";
import {Author} from "../models/Author";
import {NoteItem} from "../models/NoteItem";
import {setNote} from "../slices/NoteSlice";
import {useLinkTo, useNavigation} from "@react-navigation/native";

type NoteListItemProps = {
    item: NoteItem
}

export const NoteListItem:FC<NoteListItemProps>  = ({item})=> {
    const dispatch = useAppDispatch()
    const linkTo = useNavigation()

    return   <Pressable onPress={() =>  {
        linkTo.navigate('DetailansichtNote', {id: item.id, screen: 'NoteD'})
        dispatch(setNote(item))
    } }>
    <View style={{borderColor:'#000', borderBottomWidth: 2}}/>
    <View p={2}
    style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
    my={2} rounded="md">
        <Text>{item.title}</Text>
        <Icon style={{width: '20px', height:'20px'}}>
    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </Icon>
        </View>
        </Pressable>
}
