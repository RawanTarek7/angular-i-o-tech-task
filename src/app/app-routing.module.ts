import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/classes'
  },
  {
    path: 'classes',
    loadChildren: () => import('./modules/classes/classes.module').then(m => m.ClassesModule)
  }, {
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients.module').then(m => m.ClientsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
