# TOKENTIX

Welcome to TokenTix, the cutting-edge solution for seamless ticket booking and event registeration platform bridging web2 and web3 users by leveraging Solana blockchain technology.

For more details, please visit the [TokenTix website](https://c-hack-submission.vercel.app/).

## Description

TokenTix redefines the ticketing experience, eliminating ticket scalping, fraud, and inflated prices by using cNFTs , Through a user-centric approach, TokenTix offers a transparent, secure, and user-friendly platform for both event organizers and attendees.

# RoadMap
1. Application Prototype Demo &#10004;
2. Onboarding Users (coding)
3. Integrating Payments
4. Onboarding Event Hosts  (coding)
5. Zoom and Twitter integration
6. Hosts Dashboard
7. Testing
   
## Installation & Setup

### Prerequisites

- Node.js
- Git
- Expo CLI


```bash
## Installation

git clone https://github.com/HaranK007/TokenTix.git
cd TokenTix
npm install
```

```bash
## move the file named TokenGeneration_Server to a seperate folder

cd TokenGeneration_Server
npm install
```

## Running the Project

Update the IP address in 'src/screens/EventDetails.js':

1. Start the Expo server:

```bash
## move inside ToTenTix root file

npx expo start --port=<<port number>>

## make sure that it is in expo go mode and scan the QR code using your expo go app
```
2. Start the TokenGeneration server:
   
```bash
## move inside TokenGeneration_Server file

node server.js

```
