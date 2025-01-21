import { Component, OnInit } from '@angular/core';
import { ClientsDTO } from '../models/ClientsDTO';
import { MockClients } from '../models/MockClients';
import { ClientsTableService } from './clients-table.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clients-table',
  imports: [],
  standalone: true,
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css'
})
export class ClientsTableComponent implements OnInit {

  clients: ClientsDTO[] = [];
  id: number = 0;

  constructor(private clientsService:ClientsTableService, private parameter: ActivatedRoute) { }

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    if (!this.parameter) {
      console.error('ActivatedRoute is undefined');
      return;
    }

    this.parameter.paramMap.subscribe(params => {
      this.id = parseInt(params.get('id') || '0');
      console.log('id: ', this.id);
    });

    this.clients = this.clientsService.getClients();
  }

}
