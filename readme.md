### A very simple NodeJS app for [K3S Example Project](https://github.com/madlopt/k3s-example-project ) 


You can configure it via the following environment variables:

          - name: PROJECT_NAME
            value: "nodejs-test-app"
          - name: CONSOLE_LOG_TIMEOUT
            value: "5000"
          - name: METRICS_ROUTE
            value: "/metrics"
          - name: METRICS_PORT
            value: "80"
          - name: METRICS_COMPONENT
            value: "applications"
          - name: METRICS_SOURCE
            value: "nodejs-test-app"
          - name: METRICS_NAMESPACE
            value: "default"

The app is just sending `PROJECT_NAME is alive` message to the console every `CONSOLE_LOG_TIMEOUT` milliseconds and exposing the metrics endpoint on the `METRICS_ROUTE` route and `METRICS_PORT` port.

### Metrics

There are a lot of default metrics available, from the [prom-client](https://github.com/siimon/prom-client)  library. And the one is custom one ``http_requests_counter`` which is a counter of all the requests to the application just as an example of custom metric you can add.

I'm using a wrapper `service/collectDefaultMetricsWrapper.js` for the prom-client library, because the library has a memory leak when it's accessing the `gc`. So the wrapper is simply excluding the `gc` usage from the metrics. You are free to use it.

### DockerHub Image

The image I'm using for [K3S Example Project](https://github.com/madlopt/k3s-example-project ) is [there](https://hub.docker.com/r/madloptus/nodejsapp) you can pull it by running `docker pull madloptus/nodejsapp`

### Running the app locally

Not sure even if someone will need it, but if you want to run the app locally, there is the docket-compose file for that. Just run `docker-compose up` and the app will be available on the `http://localhost:80`. If you want to run if without anything just on your local machine, don't forget to run `npm install` before the first run.

