import { StackContext, Api } from "sst/constructs";

const BASELIME_OTEL_KEY = process.env.BASELIME_OTEL_KEY || 'your-key-here';

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
    defaults: {
      function: {
        runtime: 'nodejs16.x',
        nodejs: {
          format: 'cjs',
          install: ["@baselime/lambda-node-opentelemetry"]
        },
        environment: {
          BASELIME_OTEL_KEY,
          BASELIME_NAMESPACE: stack.stackName,
          NODE_OPTIONS: '--require node_modules/@baselime/lambda-node-opentelemetry/lambda-wrapper.js'
        }
      }
    }
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });
}
