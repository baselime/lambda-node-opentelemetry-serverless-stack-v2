import { Time } from "@lambda-node-opentelemetry-serverless-stack-v2/core/time";

const handler = async () => {
  return {
    body: `Hello world. The time is ${Time.now()}`,
  };
};

exports.handler = handler;