import { createAction, props, union} from '@ngrx/store';
import { Note } from '../models';

export const loadNotes = createAction('[Note] Load notes');
export const saveNotes = createAction('[Note] Save notes', props<{notes: Note[]}>());

export const loadNote = createAction('[Note] Load note', props<{id: number}>());
export const saveNote = createAction('[Note] Save note', props<{note: Note}>());

export const createNote = createAction('[Note] Create note', props<{note: Note}>());
export const createNoteFailure = createAction('[Note] Create note success', props<{error: string}>());
export const createNoteSuccess = createAction('[Note] Create note failure', props<{message: string}>());

export const deleteNote = createAction('[Note] Delete note', props<{idNote: number}>());
export const deleteFailure = createAction('[Note] Delete note success', props<{error: string}>());
export const deleteSuccess = createAction('[Note] Delete note failure', props<{message: string}>());

export const updateNote = createAction('[Note] Update note', props<{note: Note}>());
export const updateNoteFailure = createAction('[Note] Update note success', props<{error: string}>());
export const updateNoteSuccess = createAction('[Note] Updateate note failure', props<{message: string}>());

export const redirectNotes = createAction('[Note] Redirect');


const all = union({
  loadNotes,
  saveNotes,
  loadNote,
  saveNote,
  createNote,
  createNoteFailure,
  createNoteSuccess,
  deleteNote,
  deleteFailure,
  deleteSuccess,
  updateNote,
  updateNoteFailure,
  updateNoteSuccess,
  redirectNotes
})

export type NoteActionsUnion = typeof all;
