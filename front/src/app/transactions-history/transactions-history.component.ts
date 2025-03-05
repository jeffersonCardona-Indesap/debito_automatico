import { Component, OnInit } from '@angular/core';
import { searchParams, TransactionsDTO } from '../models/TransactionsDTO';
import { CommonModule, DatePipe } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import { TransactionService } from '../services/TransactionService/transaction.service';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerI18n, NgbDatepickerModule, NgbDateStruct, NgbTooltip, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomDatepickerI18n } from '../../assets/i18n/custom-datepicker-i18n';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-transactions-history',
  imports: [DatePipe, CurrencyPipe, FormsModule, NgbTooltipModule, NgbTooltip, CommonModule,
    NgbDatepickerModule
  ],
  providers: [
    { provide: NgbDatepickerI18n, useClass: CustomDatepickerI18n }, // Provide the custom class
  ],
  templateUrl: './transactions-history.component.html',
  styleUrl: './transactions-history.component.css'
})
export class TransactionsHistoryComponent implements OnInit{
  transactions: TransactionsDTO[] = [];
  search: string = '';
  searchParam: searchParams ={
    searchMessageId: '',
    searchTimestamp: '',
    searchStatus: '',
    searchErrors: [],
    searchErrorType: '',
    searchPath: '',
    searchMessage: '',
    searchOPDataTrxID: '',
    searchOPDataChannel: '',
    searchOPDataRequestId_to_reverse: '',
    searchOPDataReverse: '',
    searchOPDataDate: '',
    searchOPDataTotalAmount: '',
    searchOPDataOriginCustomerName: '',
    searchOPDataOriginCustomerType: '',
    searchOPDataOriginIdentification: '',
    searchOPDataOriginBankID: '',
    searchOPDataOriginAccountType: '',
    searchOPDataOriginAccountNumber: '',
    searchOPDataDestinationCustomerName: '',
    searchOPDataDestinationCustomerType: '',
    searchOPDataDestinationIdentification: '',
    searchOPDataDestinationBankID: '',
    searchOPDataDestinationAccountType: '',
    searchOPDataDestinationAccountNumber: '',
};
  model!: NgbDateStruct | undefined;
  model2!: NgbDateStruct | undefined;

  // Pagination

  currentPage: number = 1;
  itemsPerPage: number = 10; // Default items per page
  totalItems: number = 0; // Total items from the API
  itemsPerPageOptions: number[] = [10, 20, 50, 100]; // Dropdown options
  data: any[] = [];

   //

  constructor(
    private transactionService: TransactionService,
    private authService: AuthService,
    private route: Router
  ) { }

  ngOnInit() {
    if(this.authService.hasPermission()){
      this.fetchData();
    } else {
      this.route.navigate(['/']);
    }

  }

  searchFun(event: KeyboardEvent){
    if(event.key === 'Enter') {
      console.log('searchParam: ', this.searchParam);
      this.fetchData();
    }
  }

    changePage(page: number): void {
      this.currentPage = page;
      this.fetchData();
    }

    fetchData(): void {
      if (this.model && this.model.year && this.model.month && this.model.day) {
        const date = new Date(this.model.year, this.model.month - 1, this.model.day);
        this.searchParam.searchTimestamp = date.toISOString().split('T')[0];
        } else {
        // Handle the case where model is not defined or has invalid values
        this.searchParam.searchTimestamp = '';
        this.model = undefined; // Set model back to undefined
      }
      if(this.model2 && this.model2.year && this.model2.month && this.model2.day){
        const date = new Date(this.model2.year, this.model2.month - 1, this.model2.day);
        this.searchParam.searchOPDataDate = date.toISOString().split('T')[0];
      } else {
        this.searchParam.searchOPDataDate = '';
        this.model2 = undefined;
      }

      this.transactionService.getAllTransactions(this.currentPage, this.itemsPerPage,this.searchParam).subscribe((response: any) => {
        console.log(this.searchParam);
         this.transactions = response.data;
         this.totalItems = response.totalItems;
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

    exportToCSV() {
      if (this.model && this.model.year && this.model.month && this.model.day) {
        const date = new Date(this.model.year, this.model.month - 1, this.model.day);
        this.searchParam.searchTimestamp = date.toISOString().split('T')[0];
        } else {
        // Handle the case where model is not defined or has invalid values
        this.searchParam.searchTimestamp = '';
        this.model = undefined; // Set model back to undefined
      }
      if(this.model2 && this.model2.year && this.model2.month && this.model2.day){
        const date = new Date(this.model2.year, this.model2.month - 1, this.model2.day);
        this.searchParam.searchOPDataDate = date.toISOString().split('T')[0];
      } else {
        this.searchParam.searchOPDataDate = '';
        this.model2 = undefined;
      }
      this.transactionService.exportToCSV(this.searchParam).subscribe((response: any) => {
        const blob = new Blob([response], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'transactions.csv';
        a.click();
      });
    }
}
