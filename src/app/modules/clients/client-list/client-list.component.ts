import {Component, OnDestroy, OnInit} from '@angular/core';
import {GymService} from "../../../services/gym.service";
import {IClients} from "../../../interfaces/client.inerface";
import {MatSnackBar} from "@angular/material/snack-bar";
import { Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit, OnDestroy {

  clients: IClients[] = [];

  displayedColumns: string[] = ['name', 'phone', 'address', 'subscription', 'actions'];
  deleteClientSubscription?: Subscription;


  constructor(private gymService: GymService, private snackBar: MatSnackBar,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getClients()

    this.deleteClientSubscription = this.gymService.getDeleteClientObservable().subscribe(() => {
      this.getClients();
    });
  }

  editTableItem(element: any) {
    console.log('edit', element.id)
    this.router.navigate(['/clients/' + element.id]);


  }

  deleteTableItem(element: any) {
    this.gymService.deleteClient(element.id).then((response) => {
      console.log('Client deleted:', response);
      this.getClients()
      this.snackBar.open('Client deleted successfully', 'Dismiss', {
        duration: 500,
      });
    }).catch((error) => {
      this.snackBar.open(`Error deleting client`, 'Dismiss', {
        duration: 500,
      });
      console.error('Error deleting client:', error);
    });
  }

  getClients(): void {
    this.gymService.getClients()
      .then(data => {
        this.clients = data
        console.log('Clients:', this.clients);

      })
      .catch(error => {
        console.error('Error fetching clients:', error);
      });
  }

  ngOnDestroy() {
    // Unsubscribe from the deleteClientObservable when the component is destroyed
    this.deleteClientSubscription?.unsubscribe();
  }

  addNewClient() {
    this.router.navigate(['/clients/id']);

  }
}
