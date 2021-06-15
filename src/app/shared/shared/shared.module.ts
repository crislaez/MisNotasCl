import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HammerModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HammerModule,
    IonicModule
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule,
    HammerModule
  ]
})
export class SharedModule {}
