# Developing Bitazza assignment app

### Link to the demo video.

[![Here's demo video.](https://img.youtube.com/vi/pIVnH6L-P30/0.jpg)](https://youtu.be/pIVnH6L-P30)

# Getting started

## Setting Up the Environment and tools needed

**Fork** and clone this repository to your machine. https://github.com/topkoong/bitazza-assignment.git
Make sure that you have `Node Latest LTS version, recommended 12.16.2 version` installed on your local machine.

### Installing Node Latest LTS version, recommended 12.16.2 version

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It is available for multiple operating systems, such as Windows, macOS, and Linux. Node.js is needed to develop an Excel custom function.

Download the Node.js source code or a pre-built installer for your platform https://nodejs.org/en/download/
After the installation has been completed, we can check that everything went correctly. Open PowerShell, or whatever Terminal you are using, and type the following commands:

```bash
node -v
npm -v
```

The commands should show you the installed versions, Node.js and npm

npm comes with the Node.js installation and is a package manager for JavaScript. We will use that a lot when we are installing different node modules to our web app.

#### Alternatively, running multiple versions of NodeJS with nvm for Windows

Here're the steps to install nvm-windows and then use it to install Node.js and Node Package Manager (npm).

https://docs.microsoft.com/en-us/windows/nodejs/setup-on-windows

### Installing VSCode

Visual Studio Code (VS Code) is an open source code editor for multiple programming languages. VS Code is developed by Microsoft. There are a lot of different code editors available, such as Atom, Brackets, and others, and you can use something other than VS Code if you are familiar with it. VS Code is available for Windows, macOS, and Linux and you can download it from https://code.visualstudio.com/.

### Installing server dependencies

Navigate to the root of the project. Now run the following commands to set up your working directory.

```bash
cd server
npm install
```

### Installing client dependencies

```bash
cd client
yarn install
```

### Add an .env file in the server folder with the following

```
NODE_ENV=development
MONGODB_URI=mongodb://localhost/Bitazza
SERVER_PORT=8000
```

### Add an .env file in the client folder with the following

```
REACT_APP_WS_ENDPOINT=wss://apexapi.bitazza.com/WSGateway
REACT_APP_API=http://localhost:8000/api
REACT_APP_AUTH_KEY=X-Auth-Token-Msg
REACT_APP_AUTH_VALUE=bIt@zza-@ss|gnmEnt
```

## How to run the project

To test your Party Haan app on the web, execute the following command to run the web app on your local machine:

Server

```bash
cd server
npm start
```

Client

```bash
cd client
yarn start
```

## API Health Checks

#### Example 1 Health check endpint

Health checks provide a simple mechanism to determine whether a server-side application is behaving properly. They're typically consumed over HTTP and use standard return codes to indicate UP or DOWN status as well as the number of seconds the current Node.js process has been running. In short, server can respond to requests with the health of the service.

```
    GET /health HTTP/1.1

    http://localhost:8000/api/health
```

#### Example 2 Core service tracking performance usage of Node.js app

```
    GET /usage HTTP/1.1

    http://localhost:8000/api/usage
```
