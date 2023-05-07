import {RouterModule, Routes} from '@angular/router';
import {HotelListComponent} from './components/hotel-list/hotel-list.component';
import {NgModule} from '@angular/core';

export const routes: Routes = [
  {
    path: 'hotel-list',
    component: HotelListComponent
  },
  {
    path: '**',
    redirectTo: 'hotel-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor() {
  }
}
