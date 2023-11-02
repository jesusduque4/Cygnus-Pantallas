import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NavbarComponent } from './components/mosaic/components/navbar/navbar.component';
import { NavitemsComponent } from './components/mosaic/components/navbar/navitems/navitems.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { LoadingComponent } from './components/loading/loading.component';
import { CardsectionsComponent } from './components/mosaic/components/cardsections/cardsections.component';
import { VideoplayerComponent } from './components/mosaic/components/videoplayer/videoplayer.component';
import { CommonModule } from '@angular/common';
import { IntervalPipe } from './pipes/interval.pipe';
import { FormsModule } from "@angular/forms";
import { DataZoneComponent } from './components/mosaic/components/data-zone/data-zone.component';
import { RigthBarComponent } from './components/mosaic/components/rigth-bar/rigth-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    MosaicComponent,
    NavbarComponent,
    NavitemsComponent,
    LoadingComponent,
    CardsectionsComponent,
    VideoplayerComponent,
    IntervalPipe,
    DataZoneComponent,
    RigthBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    ImportssharedModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
