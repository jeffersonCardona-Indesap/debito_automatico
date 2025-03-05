import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyService } from '../../services/CompanyService/company.service';
import { CompaniesDTO } from '../../models/CompaniesDTO';
import { NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from '../../alerts/alerts.component';

@Component({
  selector: 'app-delete-company',
  imports: [
    NgbTooltipModule,
    CommonModule,
    AlertsComponent
  ],
  templateUrl: './delete-company.component.html',
  styleUrl: './delete-company.component.css'
})
export class DeleteCompanyComponent implements OnInit {
  @Output() companyDeleted = new EventEmitter<boolean>();
  @Input() company: CompaniesDTO = {
    nombreEmpresa: '',
    nit: 0,
    codGrupo: '',
    fechaCorte: new Date()
  }

  closeResult = '';

  messageType: string = '';
  messageContent: string = '';

  constructor(
    private companyService: CompanyService,
    private modal: NgbModal,

  ) { }

  ngOnInit(): void {
  }

  open(content: any) {
    this.modal.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.messageType = 'warning';
      this.messageContent = 'Se ha cancelado la eliminación de la compañía.';
      this.removeAlert();
    }, (reason) => {
      this.closeResult = `Dismissed`;
    });
  }

  deleteCompany() {
    // Delete company
  this.companyService.deleteCompany(this.company.nit).subscribe({
    next: (data) => {
      this.messageType = 'success';
      this.messageContent = 'Se ha eliminado la compañia correctamente.';
    },
    error: (error) => {
      this.messageType = 'danger';
      this.messageContent = 'Error al eliminar la compañía.';
    },
    complete: () => {
      this.removeAlert();
      this.modal.dismissAll();
    }
  });
  }

  removeAlert() {
    setTimeout(()=>{
      this.messageType = '';
      this.messageContent = '';
      this.companyDeleted.emit();
    }, 4000)
  }
}
