let nconf = require('nconf');

nconf.defaults({
    settings: {
        projectName: process.env.PROJECT_NAME || 'nodejs-test-app',
        consoleLogTimeout: process.env.CONSOLE_LOG_TIMEOUT || 5000,
        metrics: {
            method: 'GET',
            route: process.env.METRICS_ROUTE || '/metrics',
            port: process.env.METRICS_PORT || 80,
            component: process.env.METRICS_COMPONENT || 'applications',
            source: process.env.METRICS_SOURCE || 'nodejs-test-app',
            namespace: process.env.METRICS_NAMESPACE || 'default'
        }
    }
});

module.exports = nconf;
