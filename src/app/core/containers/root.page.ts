import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  template:`
  <ion-app>
        <!-- CABECERA  -->
      <ion-header [translucent]="true" no-border >
        <ion-toolbar mode="md|ios">
          <!-- <div size="small" slot="end">
          </div> -->

          <ion-title class="color-text" >MisNotasCl</ion-title>

          <!-- <div size="small" slot="end">
          </div> -->
        </ion-toolbar>
      </ion-header>

    <!-- MENU LATERAL  -->
    <!-- <ion-menu side="start" menuId="first" contentId="main" class="color-components">
      <ion-header class="color-components">
        <ion-toolbar class="color-components" >
          <ion-title class="color-text">Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content class="color-components" >
        <ion-list class="color-components">
          <ion-item class="color-text color-components" [routerLink]="['home']" (click)="openEnd()">Pokemon</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu> -->

    <!-- RUTER  -->
    <ion-router-outlet id="main"></ion-router-outlet>

  </ion-app>
  `,
  styleUrls: ['./root.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {

  constructor(private menu: MenuController, private store: Store, private router: Router) {
    // this.menuList$.subscribe(data => console.log(data))
  }

  open() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  redirectTo(passage: string): void{
    this.router.navigate(['/chapter/'+passage])
    this.menu.close('first')
  }

  openEnd() {
    this.menu.close();
  }

}
