# 🌐 Three-Tier Web Architecture on AWS Using Terraform

## 📜 Project Overview
This project demonstrates the implementation of a highly scalable, secure, and available three-tier web architecture on AWS using Terraform. The architecture is designed to ensure redundancy, high availability, and fault tolerance, making it suitable for production-grade applications.

## 📜 Project Architecture

![image](https://github.com/user-attachments/assets/4954d380-4630-48f8-a161-8671eb3ce616)



## 📘 Introduction
The three-tier architecture is a well-established software architecture pattern that divides a web application into three layers: Web, Application, and Database. Each tier is responsible for a specific aspect of the application, ensuring separation of concerns and enhancing scalability, maintainability, and security.

## 🏗️ Architecture Overview
The architecture is built using AWS services and Terraform to automate the provisioning of infrastructure. The three tiers are deployed in a Virtual Private Cloud (VPC) across multiple Availability Zones (AZs) to ensure high availability.

## Final Output

![image](https://github.com/user-attachments/assets/b852da60-d170-4fb5-aa46-0edbd550c52a)



### Components
#### 🌐 VPC
- **Description**: The entire architecture resides within an AWS Virtual Private Cloud (VPC), a logically isolated network in the AWS cloud.
- **Features**: The VPC is configured with both public and private subnets across two Availability Zones (AZs) to ensure high availability and fault tolerance.

#### 🌍 Internet Gateway
- **Description**: An Internet Gateway (IGW) is attached to the VPC to enable communication between the VPC and the internet.
- **Role**: Resources within public subnets, such as the Web Tier, can communicate with the internet via the IGW.

#### 🖥️ Web Tier
- **Public Subnets**: The Web Tier is deployed in public subnets across two AZs to ensure redundancy and availability.
- **Amazon EC2 Instances**: EC2 instances in this tier host the frontend web application that users interact with. These instances are accessible from the internet because they reside in public subnets.
- **Elastic Load Balancer (ELB)**: The ELB distributes incoming traffic from the internet to the EC2 instances in the Web Tier, ensuring that traffic is balanced across the instances in both AZ1 and AZ2, providing fault tolerance.

#### 🛠️ Application Tier
- **Private Subnets**: The Application Tier is deployed in private subnets, which are isolated from direct internet access for enhanced security.
- **Amazon EC2 Instances**: EC2 instances in this tier run the business logic of the application. They process requests from the Web Tier and interact with the Database Tier. These instances are not directly accessible from the internet, as they are in private subnets.

#### 💾 Database Tier
- **Private Subnets**: The Database Tier is deployed in private subnets to ensure security.
- **Amazon MySQL Primary DB**: The primary MySQL database is hosted in one of the private subnets, handling all read and write operations.
- **MySQL Read Replica**: A read replica of the MySQL database is deployed in another private subnet. It handles read requests to improve overall read performance and provides fault tolerance. Data is asynchronously replicated from the primary DB to the read replica.

## 🔄 Traffic Flow
1. **User Requests**: Users interact with the web application through their browser, sending requests over the internet.
2. **ELB**: The ELB receives these requests and distributes them to the appropriate EC2 instances in the Web Tier.
3. **Web Tier to App Tier**: The EC2 instances in the Web Tier process the initial request and forward it to the EC2 instances in the Application Tier for further processing.
4. **App Tier to Database Tier**: If the request involves database interaction, the EC2 instances in the Application Tier communicate with the MySQL database in the Database Tier.
5. **Response**: The processed data is then sent back through the tiers, with the Web Tier returning the final response to the user via the ELB.

## 🔐 High Availability and Fault Tolerance
- **Multiple AZs**: The architecture is deployed across multiple Availability Zones, ensuring that the application remains available even if one AZ fails.
- **Elastic Load Balancer (ELB)**: The ELB distributes traffic evenly across the EC2 instances in the Web Tier, preventing any single instance from becoming a bottleneck.
- **MySQL Replication**: The MySQL Read Replica ensures that read requests can still be processed even if the primary database becomes unavailable.

## 📝 Conclusion
This three-tier architecture, automated with Terraform, provides a robust, scalable, and secure foundation for deploying web applications on AWS. By separating concerns across distinct layers and deploying across multiple Availability Zones, the architecture ensures high availability, fault tolerance, and efficient resource management.

