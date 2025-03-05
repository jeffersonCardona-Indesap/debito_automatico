import { Routes } from '@angular/router';
import { InitialComponent } from './initial/initial.component';
import { GeneralContentComponent } from './general-content/general-content.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { AddUpdateCompanyComponent } from './general-content/add-update-company/add-update-company.component';
import { AlertsComponent } from './alerts/alerts.component';

export const routes: Routes = [
  {
    path   : '',
    component: InitialComponent,
    pathMatch: 'full'
  },
  {
    path   : 'general-content',
    component: GeneralContentComponent,
    pathMatch: 'full'
  },
  {
    path: 'clients/:id',
    component: ClientsTableComponent,
    pathMatch: 'full'
  },
  {
    path:'transactions/:id',
    component: TransactionsHistoryComponent,
    pathMatch: 'full'
  },
  {
    path: 'add-update-company',
    component: AddUpdateCompanyComponent,
    pathMatch: 'full'
  },
  {
    path: 'alerts',
    component: AlertsComponent,
    pathMatch: 'full'
  }
];
