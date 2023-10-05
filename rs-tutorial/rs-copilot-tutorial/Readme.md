
  

## Summary
This template creates the refactor environment for the Refactor Spaces and Copilot tutorial.

### Create the refactor environment

This template(**rs.yaml**) creates a Proxy VPC with 2 subnets, a Refactor Spaces environment and application, and a default service and route with Refactor Spaces.

  

When creating the stack, you will be asked for the following:

  

-  **MonolithUrl** - Specify the ALB URL for the Monolith deployed through Copilot CLI. This is a mandatory parameter. The URL has to be http://abc.com or https://abc.com format to avoid errors during resource creation.

  

-  **VpcName** - Name for the proxy VPC used in Refactor Spaces. The application's proxy VPC is used to route traffic from the proxy to Refactor Spaces services with URL endpoints.

    Default: refactor-spaces-tutorial-vpc

  

-  **VpcCIDR** - CIDR block for the VPC

    Default: 10.0.0.0/16

  

-  **PublicSubnet1CIDR** - CIDR block for public subnet 1

    Default: 10.0.1.0/24

  

-  **PublicSubnet2CIDR** - CIDR block for public subnet 2

    Default: 10.0.2.0/24

  

-  **EnvironmentName** - Name your Refactor Spaces environment.

    Default: rs-tutorial-env

  

-  **ApplicationName** - Name your Refactor Spaces application.

    Default: rs-tutorial-app

  

-  **NetworkFabricType** - Select if you want Refactor Spaces to provision a network bridge (Transit Gateway) to establish cross account/VPC network connectivity.

    Default: NONE

  

-  **ProxyEndpointType** - Select if you want your API to be public (REGIONAL) or private (PRIVATE). If set to REGIONAL, Refactor Spaces provisions a regional (public) API endpoint. If set to PRIVATE, Refactor Spaces provisions a private API endpoint. More info on endpoint types [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html).
	
    Default: REGIONAL

  

-  **DefaultServiceName** - Enter the name for the Default Service

    Default: Monolith


### Create services and routes for the microservices

This template(**rs-service-op.yaml**) creates a services and routes within the refactor environment for the microservices. 

When creating the stack, you will be asked for the following:

- **PostsUrl** - Specify the ALB URL for the posts service deployed through Copilot CLI

- **UsersUrl** - Specify the ALB URL for the users service deployed through Copilot CLI

- **ThreadsUrl** - Specify the ALB URL for the threads service deployed through Copilot CLI

- **EnvironmentId** - Specify the Refactor Spaces EnvironmentID 
  
- **ApplicationID** - Specify the Refactor Spaces ApplicationID 