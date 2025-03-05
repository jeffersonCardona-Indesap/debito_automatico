import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompaniesDTO } from '../../models/CompaniesDTO';
import { NgbAlertModule, NgbDatepickerModule, NgbDateStruct, NgbModal, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyService } from '../../services/CompanyService/company.service';
import { AlertsService } from '../../alerts/alerts.service';
import { AlertsComponent } from '../../alerts/alerts.component';


@Component({
  selector: 'app-add-update-company',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbAlertModule,
    NgbDatepickerModule,
    FormsModule,
    AlertsComponent
  ],
  standalone: true,
  templateUrl: './add-update-company.component.html',
  styleUrl: './add-update-company.component.css'
})
export class AddUpdateCompanyComponent implements OnInit {

  @Input() btnType: string = 'create';
  @Input() company:CompaniesDTO = {
    nombreEmpresa: '',
    nit: 0,
    codGrupo: '',
    fechaCorte: new Date()
  } // Data received for update
  @Output() companyCreated: EventEmitter<any> = new EventEmitter();

  companyForm!: FormGroup;
  closeResult = '';
  model!: NgbDateStruct;
  messageType: string = '';
  messageContent: string = '';




  constructor(private fb: FormBuilder,
    private modal: NgbModal,
    private companyService: CompanyService,
    private alert: AlertsService
  ) { }

  ngOnInit(): void {
    // Initialize form
    this.companyForm = this.fb.group({
      nombreEmpresa: ['', [Validators.required, Validators.minLength(3)]],
      nit: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      codGrupo: ['', [Validators.required, Validators.minLength(3)]],
      fechaCorte: [new Date()]
    });

    // If update type, patch form with data
    if (this.btnType === 'update' && this.company) {
      this.companyForm.patchValue(this.company)
      const date = new Date(this.company.fechaCorte);
      this.model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    } else if(this.btnType === 'changeDate' && this.company){
      this.companyForm.patchValue(this.company)
      const date = new Date(this.company.fechaCorte);
      this.model = { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate() };
    }
  }

  open(content: any) {
    this.modal.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.messageType = 'warning';
      this.messageContent = 'La operación ha sido cancelada';
      this.removeAlert();
    }, (reason = close) => {
      this.closeResult = `Dismissed`;

    });
  }

  get formControls() {
    return this.companyForm.controls;
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const formData = this.companyForm.value;
      if (this.btnType === 'create') {
        formData.fechaCorte = new Date(this.model.year, this.model.month - 1, this.model.day);
        this.companyService.createCompany(formData).subscribe({
          next: (response) => {
            this.messageType= 'success';
            this.messageContent ='La Empresa ha sido creada exitosamente';
          },
          error: (error) => {
            console.error('Error creating company:', error);
            this.messageType= 'danger';
            this.messageContent ='Ha ocurrido un error al crear la empresa';
          },
          complete: () => {
            console.log('Create company request completed');
            this.removeAlert();
            this.modal.dismissAll();
          }
        })

      console.log('Creating company:', formData);
        this.modal.dismissAll();
      } else if (this.btnType !== 'create') {
        console.log("btnType", this.btnType);
        console.log('Updating company:');

        formData.fechaCorte = new Date(this.model.year, this.model.month - 1, this.model.day);
        this.companyService.updateCompany(formData).subscribe({
          next: (response) => {
            this.messageType= 'success';
            this.messageContent ='La Empresa ha sido actualizada exitosamente';
          },
          error: (error) => {
            console.error('Error updating company:', error);
            this.messageType= 'danger';
            this.messageContent ='Ha ocurrido un error al actualizar la empresa';
          },
          complete: () => {
            console.log('Update company request completed');
            this.removeAlert();
            this.modal.dismissAll();
          }
        });
      }
    }
  }

  removeAlert() {
    setTimeout(()=>{
      this.messageType = '';
      this.messageContent = '';
      this.companyCreated.emit();
    }, 4000)
  }


}
