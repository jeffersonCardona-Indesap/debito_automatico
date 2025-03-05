import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

export const routes: Routes = [
  {
    path: 'initial',
    loadComponent: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './InitialComponent'
      }).then(m => {
        // Dynamically load the styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://localhost:4201/styles.css';
        document.head.appendChild(link);

        return m.InitialComponent;
      })
        .catch(err => console.error('Error loading remote module', err));
    }
  },
  {
    path: 'general-content',
    loadComponent: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './GeneralContentComponent',
      }).then((m) => {
        // Dynamically load the styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://localhost:4201/styles.css';
        document.head.appendChild(link);

        return m.GeneralContentComponent;
      });
    },
    providers: [
      {
        provide: 'CompanyService',
        useFactory: () => {
          return loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './CompanyService'
          }).then(m => m.CompanyService);
        }
      }
    ], // Provide the remote service
  },
  {
    path: 'clients/:id',
    loadComponent: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './ClientsTableComponent'
      }).then(m => {
        // Dynamically load the styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://localhost:4201/styles.css';
        document.head.appendChild(link);

        return m.ClientsTableComponent;
      })
        .catch(err => console.error('Error loading remote module', err));
    }
  },
  {
    path: 'transactions/:id',
    loadComponent: () => {
      return loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './TransactionsHistoryComponent'
      }).then(m => {
        // Dynamically load the styles
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'http://localhost:4201/styles.css';
        document.head.appendChild(link);

        return m.TransactionsHistoryComponent;
      })
        .catch(err => console.error('Error loading remote module', err));
    }
  }

];
