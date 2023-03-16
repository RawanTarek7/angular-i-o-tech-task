import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {GymService} from "../../../services/gym.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-class-details',
  templateUrl: './class-details.component.html',
  styleUrls: ['./class-details.component.css']
})
export class ClassDetailsComponent implements OnInit {
  classForm: FormGroup;
  isNew = true

  classID?: number;
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder, private gymService: GymService, private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
    this.classForm = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      coach_name: new FormControl(''),
      coach_brief: new FormControl(''),
      timing: new FormControl(''),
      price: new FormControl(''),
      createdAt: new FormControl(''),
      image: new FormControl('')
    });
  }


  ngOnInit(): void {
    this.getClassById()
    this.setClassDetails()
  }

  onSubmit() {
    if (this.isNew) {
      console.log(this.classForm.value)
      this.gymService.addClass(this.classForm.value)
        .then(classes => {
          this.snackBar.open('Class Added successfully', 'Dismiss', {
            duration: 500,
          });
          this.router.navigate(['/classes']);

        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    } else {
      console.log(this.classForm.value)
      this.gymService.editClass(Number(this.classID), this.classForm.value)
        .then(classes => {
          this.snackBar.open('Class Updated successfully', 'Dismiss', {
            duration: 500,
          });
          this.router.navigate(['/classes']);

        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });

    }
  }


  getClassById(): void {
    let paramSub = this.route.paramMap.subscribe(() => {
      let classID = this.route.snapshot.paramMap.get('id');
      console.log(classID)
      if (classID && classID === 'id') {
        this.isNew = true;
      } else {
        this.classID = Number(classID);
        if (this.classID) {
          this.isNew = false;
        } else {
          this.router.navigate(['/class']);
        }
      }
    });
    this.subscriptions.push(paramSub);
  }


  setClassDetails(): void {
    this.gymService.getClass(Number(this.classID))
      .then(classes => {
        console.log('ooooh', classes)
        this.classForm.setValue(classes)
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }
}
