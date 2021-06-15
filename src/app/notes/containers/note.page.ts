import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-note',
  template: `
   <ion-content [fullscreen]="true">
    <div class="container">

      <div class="header" no-border>
        <ion-back-button defaultHref="" class="color-text" [text]="''"></ion-back-button>
        <h1 class="color-common">Agregar nota</h1>
      </div>

    </div>
  </ion-content>
  `,
  styleUrls: ['./note.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotePage {

  constructor() { }


}
