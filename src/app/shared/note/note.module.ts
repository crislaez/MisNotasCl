import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule} from '@ngrx/store';
import * as fromNote from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { NoteEffects } from './effects/note.effects';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StoreModule.forFeature(fromNote.noteKey, fromNote.reducer),
    EffectsModule.forFeature([NoteEffects]),
  ]
})
export class NoteModule {}
