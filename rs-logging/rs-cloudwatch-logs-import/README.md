# Refactor Spaces + CloudWatch Logging

## Summary

These templates demonstrate how to enable [CloudWatch execution logging and access logging](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html) for the API provisioned by Refactor Spaces using the [resource import](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/resource-import.html) feature of CloudFormation.

## Overview of Steps ##

**Step 1** - Create a Refactor Spaces environment and application, along with the necessary CloudWatch resources (log group and IAM role - more details below).  

Use **rs-cloudwatch-logging-step1.yml**

**Step 2** - Import the API Gateway API created by Refactor Spaces into the CloudFormation stack with CloudWatch logging enabled.

Use **rs-cloudwatch-logging-step2.yml**

*This template is where you can adjust the logging settings (APIStagePostConfig)

## Walkthrough ##


### Step 1 - Create the Refactor Spaces Enviroment and CloudWatch Resources ###

Use rs-cloudwatch-logging-step1.yml to create a CloudFormation stack with new resources (standard).

![stackwithnewresources](rs-logging/rs-cloudwatch-logs-import/stack-new-resources.PNG "stack with new resources")

This Cloudformation template creates the following resources:

- **VPC** (10.2.0.0/16)

- **3 subnets** within the VPC (10.2.1.0/24, 10.2.2.0/24, 10.2.3.0/24)

- **Refactor Spaces environment**  (parameter will ask if you would like Refactor Spaces to provision a Transit Gateway network bridge)

- **Refactor Spaces application** (regional) - VPC previously created is used as proxy VPC

- **Refactor Spaces service** (MonolithService) - VPC endpoint type

- **Refactor Spaces default route** (to MonolithService)

- **Refactor Spaces service** (Microservice1Service) - VPC endpoint type

- **Refactor Spaces route** (to MicroService1Service)

- **IAM Role** - Grants API Gateway permission to read and write logs to CloudWatch for the AWS account

- **AWS::ApiGateway::Account** - specifies the IAM role that API Gateway uses to write API logs to CloudWatch Logs 

- **Log Group** - holds access logs


### Step 2 - Import the API into the CloudFormation Stack with CloudWatch Logging Enabled ###

a. Once the stack creation from step 1 has completed, note the stage name and API ID of the API Gateway API created by Refactor Spaces.  These can be easily found in the AWS Management Console by selecting the stack from step 1 and viewing the values in the **Outputs** tab.

![Output](rs-logging/rs-cloudwatch-logs-import/output.PNG "Output")

b. In the AWS Management Console, select the CloudFormation stack you created in Step 1

c. Under **Stack Actions**, select **Import Resources Into Stack**

![Import Resources Into Stack](rs-logging/rs-cloudwatch-logs-import/import-resources-into-stack.PNG "Import Resources Into Stack")

d. You will be asked to specify a template.  For template source, choose to upload a template file.  Select rs-cloudwatch-logging-step2.yml and click **Next**.

e. Next, we need to identify the resource we would like to import. You will be asked for the API ID and stage name of the API created by Refactor Spaces.  Enter the values you noted in step 2a and click **Next**.  Also click **Next** at the specify stack details screen - make sure not to modify the NetworkFabricType parameter.

![Resources to Import](rs-logging/rs-cloudwatch-logs-import/resources-to-import.PNG "Resources to Import")

f. At the Review page, you will see the changes listed at the bottom of the screen.  You should see an **Import** action and **AWS::ApiGateway::Stage** as the resource type.  Click **Import Resources**.

Once the update to the stack is complete, you can verify that CloudWatch logging is enable on the API by viewing the stage in the API Gateway console and selecting the **Logs/Tracing** tab.

![Logging Settings](rs-logging/rs-cloudwatch-logs-import/stage-logging.PNG "Logging Settings")
