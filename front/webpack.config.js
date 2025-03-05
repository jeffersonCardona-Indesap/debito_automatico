const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const moduleFederationConfig = withModuleFederationPlugin({

  name: 'remoteApp',
  filename: 'remoteEntry.js',
  exposes: {
    './InitialComponent': './src/app/initial/initial.component.ts',
    './GeneralContentComponent': './src/app/general-content/general-content.component.ts',
    './ClientsTableComponent': './src/app/clients-table/clients-table.component.ts',
    './TransactionsHistoryComponent': './src/app/transactions-history/transactions-history.component.ts',
    './CompanyService': './src/app/services/CompanyService/company.service.ts',
    './TransactionService': './src/app/services/TransactionService/transaction.service.ts',
    './AlertsComponentert': './src/app/alerts/alerts.component.ts',
 },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
    // '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' }, // Share HttpClient


  },

});

moduleFederationConfig.output.publicPath = "http://localhost:4201/";
module.exports = moduleFederationConfig;
