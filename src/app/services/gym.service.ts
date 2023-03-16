import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {IClients} from "../interfaces/client.inerface";
import {IClass} from "../interfaces/class.interface";

@Injectable({
  providedIn: 'root'
})
export class GymService {
  private apiUrl = 'https://64103182e1212d9cc92c334f.mockapi.io/api/gym';
  private deleteClientSubject = new Subject<any>();
  private deleteClassSubject = new Subject<any>();

  constructor() {
  }

  getClients(): Promise<any> {
    return fetch(`${this.apiUrl}/clients`)
      .then(response => response.json());
  }

  getClient(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/clients/${id}`)
      .then(response => response.json());
  }

  addClient(client: IClients): Promise<any> {
    return fetch(`${this.apiUrl}/clients`, {
      method: 'POST',
      body: JSON.stringify(client),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  editClient(id: number, client: IClients): Promise<any> {
    return fetch(`${this.apiUrl}/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(client),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  deleteClient(id: string): Promise<any> {
    return fetch(`${this.apiUrl}/clients/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        // @ts-ignore
        this.deleteClientSubject.next();
        return response.json();
      });
  }




  getDeleteClientObservable() {
    return this.deleteClientSubject.asObservable();
  }

  getDeleteClassObservable() {
    return this.deleteClassSubject.asObservable();
  }

  getClasses(): Promise<any> {
    return fetch(`${this.apiUrl}/classes`)
      .then(response => response.json());
  }

  getClass(id: number): Promise<any> {
    return fetch(`${this.apiUrl}/classes/${id}`)
      .then(response => response.json());
  }

  addClass(classData: IClass): Promise<any> {
    return fetch(`${this.apiUrl}/classes`, {
      method: 'POST',
      body: JSON.stringify(classData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  editClass(id: number, classData: IClass): Promise<any> {
    return fetch(`${this.apiUrl}/classes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(classData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json());
  }

  deleteClass(id: string): Promise<any> {
    return fetch(`${this.apiUrl}/classes/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        // @ts-ignore
        this.deleteClassSubject.next();
        return response.json();
      });
  }
}
