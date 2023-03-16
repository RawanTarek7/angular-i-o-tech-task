import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ClassesRoutingModule } from './classes-routing.module';
import { ClassDetailsComponent } from './class-details/class-details.component';
import { ClassesListComponent } from './classes-list/classes-list.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    ClassDetailsComponent,
    ClassesListComponent
  ],
    imports: [
        CommonModule,
        MatSnackBarModule,
        ClassesRoutingModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatInputModule,
        MatProgressSpinnerModule
    ]
})
export class ClassesModule { }
