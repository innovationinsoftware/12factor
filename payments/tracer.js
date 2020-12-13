const { initTracer: initJaegerTracer } = require("jaeger-client");

module.exports.initTracer = serviceName => {
// for iowafried
  const config = {
    serviceName: serviceName,
    sampler: {
      type: "const",
      param: 1,
    },
    reporter: {
      collectorEndpoint: 'http://jaeger:14268/api/traces',
      logSpans: true,
    },
  };
  const options = {
    logger: {
      info(msg) {
        console.log("INFO ", msg);
      },
      error(msg) {
        console.log("ERROR", msg);
      },
    },
  };
  return initJaegerTracer(config, options);
};