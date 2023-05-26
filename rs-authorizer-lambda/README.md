# Refactor Spaces + API Gateway Lambda Authorizer

## Summary

This template (**rs-lambda-authorizer.yml**) demonstrates how to control access to the API provisioned by Refactor Spaces using a token-based Lambda authorizer. 

Be sure to replace the Lambda function's code (LambdaAuthorizer) with your own code or S3 key of the deployment package.

More info on Lambda authorizers: https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html

This Cloudformation template creates the following resources:

- **VPC** (10.2.0.0/16)

- **3 subnets** within the VPC (10.2.1.0/24, 10.2.2.0/24, 10.2.3.0/24)

- **Refactor Spaces environment** (parameter will ask if you would like Refactor Spaces to provision a Transit Gateway network bridge)

- **Refactor Spaces application** (regional) - VPC previously created is used as proxy VPC

- **Refactor Spaces service** (monolith) - VPC endpoint type

- **Refactor Spaces default route** (to monolith)

- **Refactor Spaces service** (microservice1) - VPC endpoint type

- **Refactor Spaces route** (to microservice1)

- **API Authorizer** - token-based Lambda authorizer.  Associated with the API provisioned by Refactor Spaces.  Uses the Lambda function created in this template (LambdaAuthorizer).

- **Custom Resource** - Points to the Lambda function which sets the authorizer ID and authorizer type for all resources and methods in the API created by Refactor Spaces.  The properties of the custom resource also passes values to the Lambda function.  In this example, we have values set the authorizer ID, API stage name, and API ID. 

- **Lambda Function (MyLambdaFunction)** - Python (Boto3) AWS Lambda function - Sets the authorizer ID (the authorizer created in this template)  and authorizer type (CUSTOM) for all resources and methods in the API created by Refactor Spaces.  A new [deployment](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-deployments.html) is also created so that these change take effect.

- **Lambda Function (LambdaAuthorizer)** - Sample Lambda function with sample code to serve as a placeholder for your own code.  Examples can be found [here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).

- **IAM Role** - Lambda exection role which allows the function to make changes to API Gateway and write to CloudWatch logs.


More info on update_method: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/apigateway/client/update_stage.html

More info on CloudFormation custom resources: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
