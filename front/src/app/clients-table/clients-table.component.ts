import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsDTO, SearchClients } from '../models/ClientsDTO';
import { MockClients } from '../models/MockClients';
import { NgxPaginationModule } from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct, NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from '../services/ClientsService/clients.service';
import { CustomDatepickerI18n } from '../../assets/i18n/custom-datepicker-i18n';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-clients-table',
  imports: [ NgxPaginationModule, CommonModule,
    FormsModule, NgbTooltipModule, NgbModule, NgbDatepickerModule
      ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // Provide the custom class
  ],
  templateUrl: './clients-table.component.html',
  styleUrl: './clients-table.component.css'
})

export class ClientsTableComponent implements OnInit {
  // page: number = 1;
  search: SearchClients = {
    searchTipoDocumento: '',
    searchDocumento: '',
    searchTipoMatricula: '',
    searchCuentaOrigen: '',
    searchCodigoBancoBeneficiario: '',
    searchCuentaBeneficiario: '',
    searchTipoIdBeneficiario: '',
    searchIdBeneficiario: '',
    searchAliasBeneficiario: '',
    searchNombreBeneficiario: '',
    searchFechaCorteBeneficiario: '',
    searchTipoCuentaBeneficiario: '',
    searchEstadoCuentaBeneficiario: ''
  };

  clients: ClientsDTO[] = [];
  allClients: ClientsDTO[] = MockClients;
  id: number = 0;

  model!: NgbDateStruct | undefined;
  // Pagination

  currentPage: number = 1;
  itemsPerPage: number = 10; // Default items per page
  totalItems: number = 0; // Total items from the API
  itemsPerPageOptions: number[] = [10, 20, 50, 100]; // Dropdown options
  data: any[] = [];

 //

  constructor(private parameter: ActivatedRoute,
              private clientsService: ClientsService,
              private authService: AuthService,
              private route: Router) { }

  ngOnInit() {
    if(this.authService.hasPermission()){
      this.fetchData();
    } else {
      this.route.navigate(['/']);
    }
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.fetchData();
  }

  fetchData(): void {
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const date = new Date(this.model.year, this.model.month - 1, this.model.day);
      this.search.searchFechaCorteBeneficiario = date.toISOString().split('T')[0];
    } else {
      // Handle the case where model is not defined or has invalid values
      this.search.searchFechaCorteBeneficiario = '';
      this.model = undefined; // Set model back to undefined
    }
    this.clientsService.getAllClients(this.currentPage, this.itemsPerPage, this.search).subscribe({
      next: (response: any) => {
        this.clients = response.data;
        this.totalItems = response.total;
      },
      error: (error: any) => {
        console.error('Error fetching clients: ', error);
      },
      complete: () => {}
    });
}

  // Change items per page
  changeItemsPerPage(itemsPerPage: number): void {
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1; // Reset to the first page
    this.fetchData();
  }

  // Get total number of pages
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  // Generate array of page numbers
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  searchClients() {
    this.fetchData();
  }

  goToHistory(client: ClientsDTO) {
    if (!client || client.id === undefined) {
      console.error('Client ID is undefined');
      console.log('client: ', client);
      return;
    }
    this.route.navigate(['/transactions', client.id]);
  }

  // Exportar a CSV

  exportar(){
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const date = new Date(this.model.year, this.model.month - 1, this.model.day);
      this.search.searchFechaCorteBeneficiario = date.toISOString().split('T')[0];
    } else {
      // Handle the case where model is not defined or has invalid values
      this.search.searchFechaCorteBeneficiario = '';
      this.model = undefined; // Set model back to undefined
    }
    this.clientsService.exportToCSV(this.search).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Cuentas Matriculadas.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Error fetching clients: ', error);
      },
      complete: () => {}
    });
  }

}
