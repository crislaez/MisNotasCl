import { createReducer, on  } from '@ngrx/store';
import { NoteActions } from '../actions';
import { Note } from '../models';


interface Status {
  pending?: boolean;
  error?: string;
}
export interface State{
  notes?: Note[];
  pending?: boolean;
  noteStatus?: Status
}

const initialState: State = {
  pending: false,
  notes: [],
  noteStatus:{pending: false}
}


const NoteReducer = createReducer(
  initialState,
  on(NoteActions.loadNotes, (state) => ({...state, pending: true})),
  on(NoteActions.saveNotes, (state, { notes }) => ({...state, notes, pending: false })),

  on(NoteActions.deleteNote, (state) => ({...state, noteStatus:{ pending: true}})),
  on(NoteActions.deleteFailure, (state, {error}) => ({...state, noteStatus:{ pending: false, error}})),
  on(NoteActions.deleteSuccess, (state) => ({...state, noteStatus:{ pending: false}})),

  on(NoteActions.updateNote, (state) => ({...state, noteStatus:{ pending: true}})),
  on(NoteActions.updateNoteFailure, (state, {error}) => ({...state, noteStatus:{ pending: false, error}})),
  on(NoteActions.updateNoteSuccess, (state) => ({...state, noteStatus:{ pending: false}})),

  on(NoteActions.createNote, (state) => ({...state, noteStatus:{ pending: true}})),
  on(NoteActions.createNoteFailure, (state, {error}) => ({...state, noteStatus:{ pending: false, error}})),
  on(NoteActions.createNoteSuccess, (state) => ({...state, noteStatus:{ pending: false}})),


);

export function reducer(state: State | undefined, action: NoteActions.NoteActionsUnion){
  return NoteReducer(state, action);
}

export const getNotes = (state: State) => state?.notes;

export const getPending = (state: State) => state?.pending;

export const getPendingStatus = (state: State) => state?.noteStatus?.pending;
