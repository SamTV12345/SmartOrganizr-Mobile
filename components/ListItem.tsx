import {Box, Center, Icon, Pressable, Text, View} from "native-base";
import {FC, memo} from "react";
import {Author} from "../models/Author";
import {useAppDispatch} from "../store/hooks";
import {setAuthor} from "../slices/AuthorSlice";
import {Path} from "react-native-svg";
import {NoteItem} from "../models/NoteItem";

interface ListItemProps {
    item: Author,
    navigate: any
}
const ListItem:FC<ListItemProps>  = ({item, navigate})=> {
    const dispatch = useAppDispatch()

    return   <Pressable onPress={() =>  {
        navigate.navigate('Detailansicht', {id: item.id})
        dispatch(setAuthor(item))
    } }>
        <View style={{borderColor:'#000', borderBottomWidth: 2}}/>
        <View p={2}
             style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
              my={2} rounded="md">
            <Text>{item.name}</Text>
            <Icon style={{width: '20px', height:'20px'}}>
                    <Path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </Icon>
        </View>
    </Pressable>
}


export default memo(ListItem)
