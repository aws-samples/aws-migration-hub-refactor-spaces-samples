# Refactor Spaces + AWS WAF

## Summary

This template (**rs-waf-ipset.yml**) demonstrates how to front an API provisioned by Refactor Spaces with AWS WAF.  Only traffic sourced from the IP addresses listed in the IP set will be allowed to invoke the API.  CloudWatch metrics are enabled on the Web ACL.

This Cloudformation template creates the following resources:

- **VPC** (10.2.0.0/16)
- **3 subnets** within the VPC (10.2.1.0/24, 10.2.2.0/24, 10.2.3.0/24)
- **Refactor Spaces environment** (parameter will ask if you would like Refactor Spaces to provision a Transit Gateway network bridge)
- **Refactor Spaces application** (regional) - VPC previously created is used as proxy VPC
- **Refactor Spaces service** (monolith) - VPC endpoint type
- **Refactor Spaces default route** (to monolith)
- **Refactor Spaces service** (microservice1) - VPC endpoint type
- **Refactor Spaces route** (to microservice1)
- **WAF IP set** with two IP addresses (192.168.2.10, 192.168.3.10)
- **WAF Web ACL** with a rule which allows traffic from the IP set previosly created.  All other traffic is blocked.
- **WAF Web ACL Association** which associates the Web ACL previously created with with API and stage created by Refactor Spaces
