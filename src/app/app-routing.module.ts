import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { NotconfiguredComponent } from './components/notconfigured/notconfigured.component';
import { VideoplayerComponent } from './components/videoplayer/videoplayer.component';

const routes: Routes = [

  { path: 'loading', component: LoadingComponent },
  { path: 'notconfigured', component: NotconfiguredComponent },
  {
    path: 'mosaic', component: MosaicComponent,
    children: [
      { path: ':id', component: VideoplayerComponent }
    ]
  },
  { path: '**', redirectTo: '/loading', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
