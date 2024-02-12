import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { aws_refactorspaces as refactorspaces } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';

export class RefactorEnvStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create the refactor environment
    const refactor_env = new refactorspaces.CfnEnvironment(this, 'refactor-env-dev', {
      name: 'Refactor Environment - Dev',
      networkFabricType: 'NONE',
      description: 'Existing eCommerce app dev environment'
    });

    // Create a VPC for the application proxy (you can also use an existing VPC)
    const vpc = new ec2.Vpc(this, 'rsvpc', {
      subnetConfiguration: [
        {
          cidrMask: 24,
          name: 'rs-subnet-1',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
        {
          cidrMask: 24,
          name: 'rs-subnet-2',
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
        },
        {
          cidrMask: 24,
          name: 'rs-subnet-3',
          subnetType: ec2.SubnetType.PUBLIC
        }        
      ],
      natGateways: 1
    });
  
    // Create a security group for the VPC
    const sg1 = new ec2.SecurityGroup(this, 'rs-app-sg1', {
      vpc: vpc,
    });

    // Create the Refactor Spaces application in the environment
    const refactor_app = new refactorspaces.CfnApplication(this, 'refactor-app-dev', {
      name: 'eCommerce-app-dev',
      environmentIdentifier: refactor_env.attrEnvironmentIdentifier,
      proxyType: 'API_GATEWAY',
      vpcId: vpc.vpcId, // VPC created above (or an existing VPC)
      apiGatewayProxy: {
        endpointType: 'REGIONAL'
      }
    });

    // Create a Refactor Spaces service in the application
    const refactor_svc = new refactorspaces.CfnService(this, 'refactor-service-dev', {
      applicationIdentifier: refactor_app.attrApplicationIdentifier,
      name: 'eCommerce-existing-dev',
      environmentIdentifier: refactor_env.attrEnvironmentIdentifier, 
      endpointType: 'URL',  // URL or Lambda ARN
      urlEndpoint: {        // Update this to point to your application URL
        url: 'https://www.amazon.com'
      }
    });

    // Create a Refactor Spaces default route to the service
    const cfnRoute = new refactorspaces.CfnRoute(this, 'refactor-default-route', {
      applicationIdentifier: refactor_app.attrApplicationIdentifier,
      environmentIdentifier: refactor_env.attrEnvironmentIdentifier,
      serviceIdentifier: refactor_svc.attrServiceIdentifier,
      routeType: 'DEFAULT'
    });

    
    // Use CfnOutput to print resource links to the terminal.
    // Note, not the normal purpose of outputs, but useful for referencing
    // in the blog post
    
    // Output a link to the environment
    new cdk.CfnOutput(this, 'rs_env_link', {
      value: 'https://console.aws.amazon.com/migrationhub/refactor-spaces/home#/environments/'
                + refactor_env.attrEnvironmentIdentifier,
      description: 'Refactor Spaces Environment AWS Console Link'
    });
       
    // Output a link to the application
    new cdk.CfnOutput(this, 'rs_app_link', {
      value: 'https://console.aws.amazon.com/migrationhub/refactor-spaces/home#/environments/'
      + refactor_env.attrEnvironmentIdentifier + '/applications/' + refactor_app.attrApplicationIdentifier,
      description: 'Refactor Spaces Application AWS Console Link',
    });

    // Output a link to the app proxy URL - the new front door
    new cdk.CfnOutput(this, 'proxy_url', {
      value: refactor_app.attrProxyUrl,
      description: 'Refactor Spaces App Proxy URL'
    });

  }
}
