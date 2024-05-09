import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { MosaicComponent } from './components/mosaic/mosaic.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { activeBreaksComponent } from './components/activeBreaks/activeBreaks.component';


const routes: Routes = [

  { path: 'loading', component: SpinnerComponent },
  { path: 'mosaic', component: MosaicComponent },
  { path: 'activeBreaks', component: activeBreaksComponent },
  { path: '**', redirectTo: '/loading', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
