import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NavbarComponent } from './components/mosaic/navbar/navbar.component';
import { NavitemsComponent } from './components/mosaic/navbar/navitems/navitems.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { LoadingComponent } from './components/loading/loading.component';
import { CardsectionsComponent } from './components/mosaic/cardsections/cardsections.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';


@NgModule({
  declarations: [
    AppComponent,
    MosaicComponent,
    NavbarComponent,
    NavitemsComponent,
    LoadingComponent,
    CardsectionsComponent,
    VideoplayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ImportssharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
