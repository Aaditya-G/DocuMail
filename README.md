# DocuMail


## Contents
- [Description](#description)
- [Authentication and Authorizatoin](#authentication-and-authorization)
- [Features](#features)
- [Setup](#setup)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Setting up Google's App Password](#setting-up-googles-app-password)
  - [Running the Service](#running-the-service)
- [Usage](#usage)
- [License](#license)


## Description
This API service is designed to retrieve transaction details for a user, generate a PDF report of these transactions, and then email this report to the user. It's a convenient way to provide users with a detailed view of their transactions in a user-friendly format.

## Authentication and Authorization
currently , we do not need any authentication to access the endpoint , to implement that we will need to create another table, or a csv file. Below is a simple procedure for a very basic auth.

We will have to define three new routes, `/register` , `/login` , `/logout` , upon registering the user's details would be stored in the user details file/table.  
We would store only the email and password for now.

Upon login , the email and password would be matched, if it fails , we will throw appropriate responsse, if it passes, we will pass create a jwt-token using the email and store it in session storage.

we will make use of a middleware function to authenticate the user , and set the header to the email from the jwt-token. if user is not authenticated then we throw an appropriate response

whenever the route `/api` and `/logout` is called , we will incorporate this middleware.

upon logout , the jwt-token would be cleared from the session storage.

## Features
- Fetch user transaction details.
- Generate a PDF report of transactions.
- Email the PDF to the user.

## Setup

### Requirements
- Node.js
- NPM (Node Package Manager)
- Access to a mail server (Gmail used in this example)

### Installation
1. Clone the repository
2. navigate to the cloned directory
3. install dependencies using npm i


### Configuration
1. Create a `.env` file in the root directory of the project.
2. Copy the contents from `.env.example` into the `.env` file.
3. Fill in the required fields in the `.env` file.

### Setting up Google's App Password
To securely use Gmail for sending emails, you need to generate an App Password. Here's how you can do it:

1. Log in to your Google account.
2. Go to My Account > Sign-in & Security > App Passwords. (You might need to sign in again to confirm it's you.)
3. Scroll down to Select App in the Password & sign-in method box and choose Other (custom name).
4. Name this app password (e.g., "nodemailer").
5. Click Generate.
6. Copy the long generated password.
7. Paste this app password into your Node.js script in the `.env` file instead of your actual Gmail password.

### Running the Service
To start the service, run: `npm start` inside the root directory

The server would run on specified host and port, it is recommended to use `localhost` as the host.

## Usage

* Make a post request to the route `\api`
* Include the following parameters in request body as JSON 
   - `startDate`
   - `endDate`
* Make sure the format of startDate and endDate is `YYYY-MM-DDTHH:mm:ss.sssZ`
* Include the following parameter in request header
    - `user-email`

### Sample Request Body

     {
        "startDate": "2023-08-08T00:00:00.000Z",
        "endDate": "2024-08-10T00:00:00.000Z"
     }

  
## License
This project is licensed under the MIT License.

### MIT License Summary
The MIT License is a permissive free software license originating at the Massachusetts Institute of Technology (MIT). It allows for the software to be used, modified, and distributed freely for both private and commercial purposes.

Key points of the MIT License:
- Freedom to use, modify, and distribute the software.
- Source code can be included in proprietary products.
- No warranty or liability is provided with the software.

For the full license text, you can refer to the [LICENSE](LICENSE) file included in this repository.

