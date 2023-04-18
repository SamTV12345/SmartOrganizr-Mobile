import {NoteItem} from "../models/NoteItem";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface NoteSliceProps {
    selectedNote: NoteItem|undefined
}

const initialState: NoteSliceProps = {
    selectedNote: undefined
}

export const noteSlice = createSlice({
    name: 'noteSlice',
    initialState,
    reducers: {
        setNote: (state, action:PayloadAction<NoteItem>)=>{
            state.selectedNote = action.payload
        }
    }
})

export const {setNote} = noteSlice.actions
export default noteSlice.reducer
