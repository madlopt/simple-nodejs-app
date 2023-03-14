const promClient = require("prom-client");
const http = require('./service/http');
const metricService = require('./service/metrics');
const config = require('./config/default').get('settings', null);
const customMetrics = [];

// Adding a useless custom metric, just for example
customMetrics.push(new promClient.Counter({
    name: 'http_requests_counter',
    help: 'number of http requests',
    labelNames: ['component', 'source', 'namespace'],
}));

// Starting the server
http.getServer(parseInt(config.metrics.port)).on('request', async (request, response) => {
    // Incrementing the custom metric
    metricService.getMetricByName('http_requests_counter', customMetrics).inc({
        component: config.metrics.component,
        source: config.metrics.source,
        namespace: config.metrics.namespace
    });
    // Exposing the metrics endpoint
    await metricService.exposeMetricsEndpoint(request, response, config.metrics, customMetrics, config.metrics.method, config.metrics.route);
});

// Just to see if the app is alive
setInterval(() => {
    console.log(`[${new Date().toISOString()}] ${config.projectName} is alive`);
}, parseInt(config.consoleLogTimeout));

// Starting message
console.log(`[${new Date().toISOString()}] ${config.projectName} is started`);