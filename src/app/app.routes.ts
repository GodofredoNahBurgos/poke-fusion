import { Routes } from '@angular/router';
import { FusionPageComponent } from './components/fusion-page/fusion-page.component';

export const routes: Routes = [
  { path: '', component: FusionPageComponent },
  { path: '**', redirectTo: '' }
];
