# Refactor Spaces + CloudWatch Logging

## Summary

This template demonstrates how to enable CloudWatch execution logging and access logging for the API provisioned by Refactor Spaces. A Lambda function is used to enable logging for the API stage.

More info on CloudWatch logging for API Gateway APIs: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html

The **rs-cloudwatch-logs.yml** Cloudformation template creates the following resources:

- **VPC** (10.2.0.0/16)

- **3 subnets** within the VPC (10.2.1.0/24, 10.2.2.0/24, 10.2.3.0/24)

- **Refactor Spaces environment** (parameter will ask if you would like Refactor Spaces to provision a Transit Gateway network bridge)

- **Refactor Spaces application** (regional) - VPC previously created is used as proxy VPC

- **Refactor Spaces service** (AdminAccountService) - VPC endpoint type

- **Refactor Spaces default route** (to AdminAccountService)

- **Refactor Spaces service** (AdminAccountService2) - VPC endpoint type

- **Refactor Spaces route** (to AdminAccountService2)

- **IAM Role** - Grants API Gateway permission to read and write logs to CloudWatch for the AWS account

- **AWS::ApiGateway::Account** - specifies the IAM role that API Gateway uses to write API logs to CloudWatch Logs 

- **Log Group** - holds access logs

- **Custom Resource** - Points to the Lambda function which enables execution and access logging for the API stage created by Refactor Spaces.  The properties of the custom resource also pass values to the Lambda function.  In this case, for example, we have values set for logging level and log format.  If you want to change the logging properties, modify them here so the correct values are passed to the Lambda function.

- **Lambda Function** - Python (Boto3) AWS Lambda function - Enables execution and access logging for the stage created by Refactor Spaces.

- **IAM Role** - Lambda exection role which allows the function to make changes to API Gateway

More info on update_stage: https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/apigateway/client/update_stage.html

More info on CloudFormation custom resources: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html

<p>

![Logs enabled in AWS Management Console](rs-logging/rs-cloudwatch-logs/cw-logging-screenshot.PNG "Logs enabled in AWS Management Console")
