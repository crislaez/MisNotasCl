import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './core';
import { CoreModule } from './core/core.module';
import { ENVIRONMENT } from './core/externals';

@NgModule({
  entryComponents: [],
  imports: [
    BrowserModule,
    CoreModule,
    // BrowserAnimationsModule,
    IonicModule.forRoot({
        scrollAssist: false,
        // autoFocusAssist: false,
        scrollPadding: false,
    }),
    StoreModule.forRoot({},
      {
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({maxAge:4}),
    AppRoutingModule,
    HammerModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: ENVIRONMENT,
      useValue: environment
    },
    Vibration
  ],
  bootstrap: [RootComponent],
})
export class AppModule {}
