# AWS Migration Hub Refactor Spaces - Sample CloudFormation Templates

This repository contains samples of [AWS Migration Hub Refactor Spaces](https://docs.aws.amazon.com/migrationhub-refactor-spaces/latest/userguide/what-is-mhub-refactor-spaces.html) CloudFormation templates.  These templates demonstrate how to create Refactor Spaces environments, applications, services, and routes.  They also show how to customize the API Gateway API orchestrated by Refactor Spaces (enabling CloudWatch logging, using WAF to protect the API, etc.)

Refactor Spaces is the starting point for incremental application refactoring to microservices in AWS. Refactor Spaces helps reduce the undifferentiated heavy lifting of building and operating AWS infrastructure for incremental refactoring. 

A Refactor Spaces environment provides the infrastructure, multi-account networking, and routing needed to incrementally modernize. Refactor Spaces environments include an application proxy that models the Strangler Fig pattern to let you transparently add new services to an external HTTPS endpoint and incrementally route traffic to the new services. Refactor Spaces bridges networking across AWS accounts to allow legacy and new services to communicate while maintaining the independence of separate AWS accounts.

You can use Refactor Spaces to:

- Refactor incrementally - Reduce risk when evolving applications into microservices and redirect traffic from old to new

- Launch a new feature, fast - Enhance or extend an application with new features in microservices without touching the old application

- Refactor an application’s account structure as a first step to modernization - Safely and incrementally move an application to multiple AWS accounts to drive team independence and agility


## rs-authorizer-lambda

These templates demonstrate how to control access to the API provisioned by Refactor Spaces using a token-based Lambda authorizer.  

## rs-logging

These templates demonstrate how to enable CloudWatch logging for the API Gateway API created by Refactor Spaces.

## rs-parameters

These templates demonstrate how to use parameters to enable you to input custom values to your template each time you create or update a stack (environment name, application name, network fabric type, proxy VPC, etc).

## rs-waf

These templates demonstrate how to create and associate an AWS WAF Web ACL with the API Gateway API created by Refactor Spaces.




