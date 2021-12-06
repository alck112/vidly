import * as Sentry from "@sentry/react";
import {Integrations} from "@sentry/tracing";

function init() {
    Sentry.init({
        dsn: "https://39aa1bffa1754d1fa0e91d7182e8db5b@o1058933.ingest.sentry.io/6050656",
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    });
}

function log(error) {
    console.error(error);
    Sentry.captureException(error);
}

export default {init, log};