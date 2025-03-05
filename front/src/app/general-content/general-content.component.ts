import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CompaniesDTO, SearchCompanies } from '../models/CompaniesDTO';
import { NgbAlertModule, NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CompanyService } from '../services/CompanyService/company.service';
import { CommonModule } from '@angular/common';
import { AddUpdateCompanyComponent } from './add-update-company/add-update-company.component';
import { DeleteCompanyComponent } from './delete-company/delete-company.component';
import { AuthService } from '../authentication/auth.service';
import { CustomDatepickerI18n } from '../../assets/i18n/custom-datepicker-i18n';

@Component({
  selector: 'app-general-content',
  imports: [NgbDatepickerModule,
    NgbAlertModule,
    FormsModule,
    CommonModule,
    AddUpdateCompanyComponent,
    DeleteCompanyComponent,
    NgbTooltipModule,
          ],
    providers: [
      { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // Provide the custom class
    ],
  templateUrl: './general-content.component.html',
  styleUrl: './general-content.component.css'
})
export class GeneralContentComponent implements OnInit{
  @ViewChild('deleteModal') deleteModal!: ElementRef;
  @Output() companyCreated: EventEmitter<any> = new EventEmitter();

  search: string = '';
  permission: boolean = false;
  firstTable: CompaniesDTO[] = [];
  model!: NgbDateStruct | undefined;
  date1: Date | undefined;
  cancelOperation: boolean = false;

  table: CompaniesDTO = {
    nombreEmpresa: '',
    nit: 0,
    codGrupo: '',
    fechaCorte: new Date()
  }

  token!: string;

  // Search filters
  searchName: string = '';
  searchNit: string = '';
  searchCodGroup: string = '';
  searchDueDate: string = '';

  searchCompaniesFilter: SearchCompanies = {
    searchNombreEmpresa: '',
    searchNit: '',
    searchCodGrupo: '',
    searchFechaCorte: ''
  }
  //



  constructor(
    private router: Router,
    private companyService: CompanyService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    if(this.authService.hasPermission()){
      this.permission = true;
      this.getAllCompanies();
    } else{
      this.router.navigate(['/']);
    }
  }



  cancelOp(){
    this.cancelOperation = true;
 }

 searchCompanies(){
  console.log('searchCompaniesFilter: ', this.searchCompaniesFilter);
  this.getAllCompanies();
 }
  //

  goToClients(table: CompaniesDTO) {
    if (!table || table.nit === undefined) {
      console.error('Client NIT is undefined');
      console.log('table: ', table);
      this.table = table;
      return;
    }

    this.router.navigate(['/clients', table.nit]);
  }

  setCompany(table: CompaniesDTO) {
    this.table = table;
  }

  goToAllClients(event: Event) {
    event.preventDefault();
    this.router.navigate(['/clients', this.table.nit]);
  }

  getAllCompanies() {
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const date = new Date(this.model.year, this.model.month - 1, this.model.day);
      this.searchCompaniesFilter.searchFechaCorte = date.toISOString().split('T')[0];
    } else {
      // Handle the case where model is not defined or has invalid values
      this.searchCompaniesFilter.searchFechaCorte = '';
      this.model = undefined; // Set model back to undefined
    }
    this.companyService.getAllCompanies(this.searchCompaniesFilter).subscribe({
      next: (data: CompaniesDTO[]) => {
        if (this.searchName || this.searchNit || this.searchCodGroup || this.searchDueDate) {
          this.firstTable = data.filter((company) =>
            (this.searchName ? company.nombreEmpresa.toLowerCase().includes(this.searchName.toLowerCase()) : true)
            && (this.searchNit ? company.nit.toString().includes(this.searchNit) : true)
            && (this.searchCodGroup ? company.codGrupo.toLowerCase().includes(this.searchCodGroup.toLowerCase()) : true)
            && (this.searchDueDate ? company.fechaCorte.toString().includes(this.searchDueDate) : true)
          );
        } else {
          this.firstTable = data;
        }
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
  }

  deleteCompany() {
    this.companyService.deleteCompany(this.table.nit).subscribe({
      next: (data: CompaniesDTO) => {
        console.log('Company deleted: ', data);
        this.getAllCompanies();
        window.location.reload();
      },
      error: (error) => {
        console.error('Error: ', error);
      }
    });
  }

  exportar(){
    if (this.model && this.model.year && this.model.month && this.model.day) {
      const date = new Date(this.model.year, this.model.month - 1, this.model.day);
      this.searchCompaniesFilter.searchFechaCorte = date.toISOString().split('T')[0];
    } else {
      // Handle the case where model is not defined or has invalid values
      this.searchCompaniesFilter.searchFechaCorte = '';
      this.model = undefined; // Set model back to undefined
    }
    this.companyService.exportToCSV(this.searchCompaniesFilter).subscribe({
      next: (blob: Blob) => {
        console.log('Respuesta del servicio en el front');

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'companies.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error exporting data: ', error);
      }
    });
  }

}
