import {Author} from "../models/Author";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {NoteItem} from "../models/NoteItem";

interface AuthorSliceProps {
    selectedAuthor: Author|undefined,
    selectedAuthorNotes: NoteItem[]| undefined,

}


const initialState: AuthorSliceProps = {
    selectedAuthor: undefined,
    selectedAuthorNotes: undefined,
}

export const authorSlice = createSlice({
    name: 'authorSlice',
    initialState,
    reducers: {
        setAuthor: (state, action:PayloadAction<Author>)=>{
            state.selectedAuthor = action.payload
        },
        setSelectedAuthorNotes:(state, action:PayloadAction<NoteItem[]>)=>{
            state.selectedAuthorNotes = action.payload
        },
        setAuthorName: (state, action:PayloadAction<string>)=>{
            if(state.selectedAuthor!== undefined) {
                state.selectedAuthor.name = action.payload
            }
        },
        setAuthorExtraInformation: (state, action:PayloadAction<string>)=>{
            if(state.selectedAuthor!== undefined) {
                state.selectedAuthor.extraInformation = action.payload
            }
        },
    }
})

export const {setAuthor, setSelectedAuthorNotes, setAuthorExtraInformation, setAuthorName} = authorSlice.actions
export default authorSlice.reducer