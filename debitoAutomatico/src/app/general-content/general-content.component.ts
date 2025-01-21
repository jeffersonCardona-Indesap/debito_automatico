import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbAlertModule, NgbDateStruct, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CompaniesDTO, MockCompanies } from '../models/CompaniesDTO';

@Component({
  selector: 'app-general-content',
  imports: [
    NgbDatepickerModule, NgbAlertModule, FormsModule, JsonPipe
  ],
  standalone: true,
  templateUrl: './general-content.component.html',
  styleUrl: './general-content.component.css'
})
export class GeneralContentComponent {
  model!: NgbDateStruct;

  firstTable: CompaniesDTO[] = MockCompanies;

  constructor(
    private router: Router
  ) { }

  goToClients(table: CompaniesDTO) {
    if (!table || table.id === undefined) {
      console.error('Client ID is undefined');
      console.log('table: ', table);

      return;
    }

    this.router.navigate(['/clients', table.id]);
  }
}
