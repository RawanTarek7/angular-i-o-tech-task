import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClassesListComponent} from "./classes-list/classes-list.component";
import {ClassDetailsComponent} from "./class-details/class-details.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: ClassesListComponent},
  {path: ':id', component: ClassDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassesRoutingModule { }
