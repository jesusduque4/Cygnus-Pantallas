import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';


const routes: Routes = [

  { path: 'loading', component: LoadingComponent },
  { path: 'mosaic', component: MosaicComponent },
  { path: '**', redirectTo: '/loading', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
