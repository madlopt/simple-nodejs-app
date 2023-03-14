'use strict';

const {isObject} = require('./../node_modules/prom-client/lib/util');

// Default metrics.
const processCpuTotal = require('./../node_modules/prom-client/lib/metrics/processCpuTotal');
const processStartTime = require('./../node_modules/prom-client/lib/metrics/processStartTime');
const osMemoryHeap = require('./../node_modules/prom-client/lib/metrics/osMemoryHeap');
const processOpenFileDescriptors = require('./../node_modules/prom-client/lib/metrics/processOpenFileDescriptors');
const processMaxFileDescriptors = require('./../node_modules/prom-client/lib/metrics/processMaxFileDescriptors');
const eventLoopLag = require('./../node_modules/prom-client/lib/metrics/eventLoopLag');
const processHandles = require('./../node_modules/prom-client/lib/metrics/processHandles');
const processRequests = require('./../node_modules/prom-client/lib/metrics/processRequests');
const processResources = require('./../node_modules/prom-client/lib/metrics/processResources');
const heapSizeAndUsed = require('./../node_modules/prom-client/lib/metrics/heapSizeAndUsed');
const heapSpacesSizeAndUsed = require('./../node_modules/prom-client/lib/metrics/heapSpacesSizeAndUsed');
const version = require('./../node_modules/prom-client/lib/metrics/version');

const metrics = {
    processCpuTotal,
    processStartTime,
    osMemoryHeap,
    processOpenFileDescriptors,
    processMaxFileDescriptors,
    eventLoopLag,
    ...(typeof process.getActiveResourcesInfo === 'function'
        ? { processResources }
        : {}),
    processHandles,
    processRequests,
    heapSizeAndUsed,
    heapSpacesSizeAndUsed,
    version,
};
const metricsList = Object.keys(metrics);

function collectDefaultMetrics(config) {
    if (config !== null && config !== undefined && !isObject(config)) {
        throw new TypeError('config must be null, undefined, or an object');
    }

    config = { eventLoopMonitoringPrecision: 10, ...config };

    for (const metric of Object.values(metrics)) {
        metric(config.register, config);
    }
}

module.exports = {collectDefaultMetrics};
module.exports.metricsList = metricsList;
