import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNote from './note.reducer';

export const noteKey = 'note';

export interface State {
  [noteKey]: fromNote.State
}

export const reducer = fromNote.reducer;

export const getNoteState = createFeatureSelector<State, fromNote.State>(noteKey);


export const getNotes = createSelector(
  getNoteState,
  fromNote.getNotes
)

export const getPending = createSelector(
  getNoteState,
  fromNote.getPending
)

export const getPendingStatus = createSelector(
  getNoteState,
  fromNote.getPendingStatus
)

export const getNote = (idNote: number) => createSelector(
  getNotes,
 (getNotes) => {
   return getNotes?.find( ({id}) => id === idNote) || {}
 }
)


