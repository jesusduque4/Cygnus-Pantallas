import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NavbarComponent } from './components/mosaic/components/data-zone/components/navbar/navbar.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { CardsectionsComponent } from './components/mosaic/components/rigth-bar/components/cardsections/cardsections.component';
import { VideoplayerComponent } from './components/mosaic/components/data-zone/components/videoplayer/videoplayer.component';
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
import { ReceptionComponent } from './components/reception/reception.component';
import { MarqueeComponent } from './components/activeBreaks/components/marquee/marquee.component';
import { FpyGraphsComponent } from './components/mosaic/components/data-zone/components/videoplayer/components/fpyGraphs/fpyGraphs.component';
import { RouterModule } from '@angular/router';
import { HeaderVerticalComponent } from './components/mosaic_vertical/components/headerVertical/headerVertical.component';
import { DataZoneVerticalComponent } from './components/mosaic_vertical/components/data-zoneVertical/data-zoneVertical.component';
import { MarquesinaVerticalComponent } from './components/mosaic_vertical/components/marquesinaVertical/marquesinaVertical.component';
import { MosaicVerticalComponent } from './components/mosaic_vertical/mosaic_vertical.component';

@NgModule({
  declarations: [
    activeBreaksComponent,
    AppComponent,
    CardsectionsComponent,
    DataZoneComponent,
    FpyGraphsComponent,
    IntervalPipe,
    MarqueeComponent,
    MarquesinaComponent,
    MosaicComponent,
    MosaicVerticalComponent,
    NavbarComponent,
    RigthBarComponent,
    SpinnerComponent,
    tittleGraph,
    VideoplayerComponent,
    WebSocketComponent,
    ReceptionComponent,
    HeaderVerticalComponent,
    DataZoneVerticalComponent,
    MarquesinaVerticalComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ImportssharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
