import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, provideFirebaseApp(() => initializeApp({"projectId":"app-agenda-7865c","appId":"1:298590638456:web:0b9f0c0b060a3cef28f88d","databaseURL":"https://app-agenda-7865c-default-rtdb.europe-west1.firebasedatabase.app","storageBucket":"app-agenda-7865c.appspot.com","apiKey":"AIzaSyDz4iOr-qtjKrBL3c_5DVtuSMtv9H8r5is","authDomain":"app-agenda-7865c.firebaseapp.com","messagingSenderId":"298590638456"})), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
