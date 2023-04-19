import {NoteItem} from "../models/NoteItem";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NoteSliceProps {
    selectedNote: NoteItem|undefined,
    searchedNoteText: string|undefined
}

const initialState: NoteSliceProps = {
    selectedNote: undefined,
    searchedNoteText: ''
}

export const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        setNote: (state, action:PayloadAction<NoteItem>)=>{
            state.selectedNote = action.payload
        },
        setNoteText: (state, action:PayloadAction<string>)=>{
            state.searchedNoteText = action.payload
        }
    }
})

export const {setNote, setNoteText} = noteSlice.actions
export default noteSlice.reducer
