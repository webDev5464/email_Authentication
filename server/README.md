# Secure Authentication Server

## Project Description

This backend is designed specifically for React developers as a learning tool. It provides features for user registration, login, and will have updates soon.

## Installation Steps

1. First, install the `node_modules`:

```bash
  npm install
```

2. Fill in the required values in the .env file.
3. Start the server with the following command:

```bash
  npm start
```

## Usage Instructions

- Register Link: When you run the server, you will receive a link to the server, for example: <http://localhost:8080>. You will find the user registration API at the /api/register path, which accepts a POST request.

## Features

### User Registration :-

    path: `/api/register`

    method: `post`

    fields: fullName, username, email, pass, conPass

### User Login :-

    path: `/api/login`

    method: `post`

    fields: username, email, pass
