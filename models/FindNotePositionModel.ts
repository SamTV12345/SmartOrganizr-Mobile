import {NoteItem} from "./NoteItem";

export interface FindNotePositionModel{
    previousNote: NoteItem|undefined,
    nextNote: NoteItem|undefined,
    positionInFolder: number,
}
