import { Injectable } from '@angular/core';
import { MockClients } from '../models/MockClients';
import { ClientsDTO } from '../models/ClientsDTO';

@Injectable({
  providedIn: 'root'
})
export class ClientsTableService {

  clients: ClientsDTO[] = MockClients;

  constructor() { }

  getClients(): ClientsDTO[] {
    return this.clients;
  }
}
