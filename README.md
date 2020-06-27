# Developing Bitazza assignment app

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
