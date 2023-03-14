'use strict';

async function exposeMetricsEndpoint(request, response, metricsConfig, customMetrics = [], method = 'GET', url = '/metrics') {
    const promClient = require("prom-client");
    const registry = new promClient.Registry();
    promClient.collectDefaultMetrics = require("./collectDefaultMetricsWrapper").collectDefaultMetrics;

    if (request.method === method) {
        if (request.url === url) {

            promClient.collectDefaultMetrics({
                prefix: '',
                gcDurationBuckets: [0.001, 0.01, 0.1, 1, 2, 5],
                labels: {
                    component: metricsConfig.component,
                    source: metricsConfig.source,
                    namespace: metricsConfig.namespace
                },
                eventLoopMonitoringPrecision: 10,
                register: registry
            });

            customMetrics.forEach(metric => {
                registry.registerMetric(metric)
            });

            let metrics = await registry.metrics();

            response.statusCode = 200;
            response.end(metrics);
        }
    }
}

function getMetricByName(name, metrics) {
    if (typeof metrics !== 'undefined' && metrics.length > 0) {
        let metric = metrics.find(metric => {
            return metric.name === name;
        });
        if (typeof metric !== undefined) {

            return metric;
        }
    }
}

module.exports = {exposeMetricsEndpoint, getMetricByName};