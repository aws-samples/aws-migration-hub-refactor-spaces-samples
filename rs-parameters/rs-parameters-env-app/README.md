# Create a Refactor Spaces Environment and Application

## Summary

This template (**rs-parameters-env-app.yml**) creates a Refactor Spaces environment and application.

When creating the stack, you will be asked for the following:

- **Name of the Refactor Spaces environment**

- **Name of the Refactor Spaces application**

- **Network Fabric Type** - If set to TRANSIT_GATEWAY, Refactor Spaces provisions a transit gateway to enable services in VPCs to communicate directly across accounts. If set to NONE, Refactor Spaces does not create a transit gateway and you must use your network infrastructure to route traffic to services with private URL endpoints.

- **Proxy VPC** - The application's proxy VPC is used to route traffic from the proxy to Refactor Spaces services with URL endpoints.

- **Proxy Endpoint Type** - If set to REGIONAL, Refactor Spaces provisions a regional (public) API endpoint.  If set to PRIVATE, Refactor Spaces provisions a private API endpoint.  More info on endpoint types [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html).


![Parameters](rs-parameters/rs-parameters-env-app/parameters-env-app.PNG
 "Parameters")
