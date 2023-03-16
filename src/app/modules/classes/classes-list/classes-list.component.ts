import {Component, OnInit} from '@angular/core';
import {GymService} from "../../../services/gym.service";
import {IClass} from "../../../interfaces/class.interface";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-classes-list',
  templateUrl: './classes-list.component.html',
  styleUrls: ['./classes-list.component.css']
})
export class ClassesListComponent implements OnInit {
  classes: IClass[] = [];
  displayedColumns: string[] = ['className', 'coachName', 'timing', 'price', 'actions'];
  deleteClassSubscription?: Subscription;


  constructor(private gymService: GymService, private snackBar: MatSnackBar, private router: Router) {
  }


  ngOnInit(): void {
    this.getClasses()

    this.deleteClassSubscription = this.gymService.getDeleteClassObservable().subscribe(() => {
      this.getClasses();
    });

  }


  editTableItem(element: any) {
    this.router.navigate(['/classes/' + element.id]);
  }

  deleteTableItem(element: any) {
    this.gymService.deleteClass(element.id).then((response) => {
      this.getClasses()
      this.snackBar.open('Class deleted successfully', 'Dismiss', {
        duration: 500,
      });
    }).catch((error) => {
      this.snackBar.open(`Error deleting class`, 'Dismiss', {
        duration: 500,
      });
    });
  }


  getClasses(): void {
    this.gymService.getClasses()
      .then(classes => {
        this.classes = classes
        console.log('classes:', this.classes);

      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }

  addNewClass() {
    this.router.navigate(['/classes/id']);

  }
}
