import {Box, Center, Pressable} from "native-base";
import {FC} from "react";
import {Author} from "../models/Author";
import {useNavigation} from "@react-navigation/native";
import {useAppDispatch} from "../store/hooks";
import {setAuthor} from "../slices/AuthorSlice";

interface ListItemProps {
    item: Author,
    navigate: any
}
export const ListItem:FC<ListItemProps>  = ({item, navigate})=> {
    const dispatch = useAppDispatch()

    return   <Pressable onPress={() =>  {
        navigate.navigate('Detailansicht', {id: item.id})
        dispatch(setAuthor(item))
    } }>
        <Box p={2}
             style={{justifyContent: 'center', flex: 1}} textAlign={"center"}
             bg="blueGray.300" my={2} rounded="md"><Center>{item.name}</Center></Box>
    </Pressable>
}