import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {GymService} from "../../../services/gym.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  isNew = true
  clientForm: FormGroup
  clientID?: number;
  private subscriptions: Subscription[] = [];
  placeholderUrl = 'assets/default-avatar.png'
  imageUrl = ''

  constructor(private fb: FormBuilder, private gymService: GymService, private router: Router
    , private route: ActivatedRoute
    , private snackBar: MatSnackBar) {
    this.clientForm = this.fb.group(
      {
        id: [''],
        avatar: [''],
        full_name: ['', Validators.required],
        mobile_number: ['', Validators.required],
        address: [''],
        subscription_plan: [''],
        createdAt: ['']
      }
    )
  }


  ngOnInit(): void {
    this.imageUrl = this.clientForm.value.avatar
    this.getClientById()
    this.setClientDetails()
  }

  setPlaceholderImage() {
    this.imageUrl = this.placeholderUrl;
  }

  getClientById(): void {
    let paramSub = this.route.paramMap.subscribe(() => {
      let clientID = this.route.snapshot.paramMap.get('id');
      console.log(clientID)
      if (clientID && clientID === 'id') {
        this.isNew = true;
      } else {
        this.clientID = Number(clientID);
        if (this.clientID) {
          this.isNew = false;
        } else {
          this.router.navigate(['/clients']);
        }
      }
    });

    this.subscriptions.push(paramSub);

  }


  setClientDetails(): void {
    this.gymService.getClient(Number(this.clientID))
      .then(client => {
        this.clientForm.setValue(client)
      })
      .catch(error => {
        console.error('Error fetching classes:', error);
      });
  }

  onSubmit() {
    if (this.isNew) {
      this.gymService.addClass(this.clientForm.value)
        .then(clients => {
          this.snackBar.open('Client Added successfully', 'Dismiss', {
            duration: 500,
          });
          this.router.navigate(['/clients']);

        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });
    } else {
      this.gymService.editClient(Number(this.clientID), this.clientForm.value)
        .then(clients => {
          this.snackBar.open('Client Updated successfully', 'Dismiss', {
            duration: 500,
          });
          this.router.navigate(['/clients']);

        })
        .catch(error => {
          console.error('Error fetching classes:', error);
        });

    }
  }

  onFileSelected($event: Event) {
    console.log('Do Nothing')
  }
}
