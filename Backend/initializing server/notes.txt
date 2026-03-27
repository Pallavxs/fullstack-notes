
## 2. What Are Packages

- **Packages** are reusable pieces of code written by other developers.
- They help avoid writing everything from scratch.
- Examples: `express`, `nodemon`, `mongoose`

const express = require(express) // package is called and saved inside variable

## 3. How to Install Packages

- Node.js uses **npm (Node Package Manager)**.
```bash
npm init -y

```bash
npm install nodemon --save-dev

## 5. What Is a Server

- A **server** is a program that:
    - Listens for client requests
    - Processes those requests
    - Sends back responses
- Servers usually run on a **port number** (e.g., 3000).

A server is a machine that is programmed to handle the user requests and give proper response...



- `express()` → creates the server
- `app.get()` → handles GET requests
- `req` → request object (data from user)
- `res` → response object (data sent back)
- `listen()` → starts the server
