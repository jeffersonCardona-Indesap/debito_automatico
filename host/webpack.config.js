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
