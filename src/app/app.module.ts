import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NavbarComponent } from './components/mosaic/components/navbar/navbar.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { LoadingComponent } from './components/loading/loading.component';
import { CardsectionsComponent } from './components/mosaic/components/rigth-bar/components/cardsections/cardsections.component';
import { VideoplayerComponent } from './components/mosaic/components/data-zone/videoplayer/videoplayer.component';
import { CommonModule } from '@angular/common';
import { IntervalPipe } from './pipes/interval.pipe';
import { tittleGraph } from './pipes/tittleAsistGraph.pipe';
import { FormsModule } from "@angular/forms";
import { DataZoneComponent } from './components/mosaic/components/data-zone/data-zone.component';
import { MarquesinaComponent } from './components/mosaic/components/marquesina/marquesina.component';
import { RigthBarComponent } from './components/mosaic/components/rigth-bar/rigth-bar.component';
import { WebSocketComponent } from './components/websocket/websocket.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { activeBreaksComponent } from './components/activeBreaks/activeBreaks.component';
import { MarqueeComponent } from './components/activeBreaks/components/marquee/marquee.component';

@NgModule({
  declarations: [
    AppComponent,
    MosaicComponent,
    NavbarComponent,
    LoadingComponent,
    CardsectionsComponent,
    VideoplayerComponent,
    IntervalPipe,
    activeBreaksComponent,
    MarqueeComponent,
    tittleGraph,
    DataZoneComponent,
    MarquesinaComponent,
    WebSocketComponent,
    SpinnerComponent,
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
