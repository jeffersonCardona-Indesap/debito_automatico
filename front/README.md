# bancoomeva-web-debito-automatico
Proyecto debito automático, Bancoomeva, portal de administración
//////////////////

# Variables de ambiente

-production<br />
-apiUrl<br />


COMPILE & BUILDER

Para hostApp y remoteApp---> ng s


ng build --configuration=production; //// Builder para producción

ng build --configuration=development  //// Builder para development


////////////EXPOSICION DE COMPONENTES Y SERVICIOS AL HOST APP////////////////

ng add @angular-architects/module-federation project --remoteApp --port 4201

Ubicación configuración microFrontEnd: webpack.config.js

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

//////////////////RECEPCIÓN DE COMPONENTES Y SERVICIOS AL HOST APP/////////////////////

ng add @angular-architects/module-federation project --hostApp --port 4200

Ubicación configuración host: webpack.config.js

        const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

        const moduleFederationConfig = withModuleFederationPlugin({

        remotes: {
            remoteApp: 'http://localhost:4201/remoteEntry.js',
        },

        shared: {
            ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
            // '@angular/common/http': { singleton: true, strictVersion: true, requiredVersion: 'auto' },
        },

        });

        moduleFederationConfig.output.publicPath = "http://localhost:4200/";

        module.exports = moduleFederationConfig;

El en el routes file requiere la siguiente estructura:

            export const routes: Routes [
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
            }
            ]

////////////////////
