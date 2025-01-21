import { Routes } from '@angular/router';
import { GeneralContentComponent } from './general-content/general-content.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';
import { InitialComponent } from './initial/initial.component';
import { SessionFailedComponent } from './session-failed/session-failed.component';

export const routes: Routes = [
  {
    path: '',
    component: InitialComponent
  },
  {
    path: 'failed',
    component: SessionFailedComponent
  },
  {
    path: 'general-content',
    component: GeneralContentComponent },
  {
    path: 'clients/:id',
    component: ClientsTableComponent
    }
]
