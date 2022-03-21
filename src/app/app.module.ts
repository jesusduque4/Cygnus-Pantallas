import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NavbarComponent } from './components/mosaic/navbar/navbar.component';
import { NavitemsComponent } from './components/mosaic/navbar/navitems/navitems.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { VideosComponent } from './components/videos/videos.component';
import { NotconfiguredComponent } from './components/notconfigured/notconfigured.component';
import { LoadingComponent } from './components/loading/loading.component';
import { CardsectionsComponent } from './components/mosaic/cardsections/cardsections.component';


@NgModule({
  declarations: [
    AppComponent,
    MosaicComponent,
    NavbarComponent,
    NavitemsComponent,
    VideosComponent,
    NotconfiguredComponent,
    LoadingComponent,
    CardsectionsComponent
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
