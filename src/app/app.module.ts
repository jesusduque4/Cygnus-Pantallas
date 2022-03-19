import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ImportssharedModule } from './modules/importsshared/importsshared.module';
import { NavitemsComponent } from './components/navbar/navitems/navitems.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavitemsComponent 
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
