# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Clone the repository

```
git clone https://github.com/potatosim/nodejs2025Q2-service.git
git checkout feature/part-2
```

## Environment variables

- copy .env.example file and rename it to .env

## Installing and running the application locally

> ⚠️ **_NOTE:_** Please, note that these steps are not a requirement for the second part etc., just FYI

`DATABASE_URL` is used if you are going to run the application locally, but in this case you need to run the next scripts:

```
npm install
npm run docker:build-postgres
npm run docker:run-postgres
npm run prisma:migrate
npm run start:dev
```

## Installing and running app/db containers:

Before running the application install docker (https://docs.docker.com/engine/install/)

# Development mode (to check that application is restarting upon changes implemented into src folder):

Run the next script to build and run database and application container based on the images in docker-compose.dev + watch mode(if there are any changes into src folder):

```
npm run docker:run-dev
```

# Production mode (to check that container auto restart after crash):

Run the next script to build and run database and application container based on the images in docker-compose.prod (you can throw new error in bootstrap fn, for example):

```
npm run docker:run-prod
```

Command to check docker image size:

```
docker image ls
```

To run all previous tests open new terminal and enter:

> ⚠️ **_NOTE:_** Please, make sure that the app is running and you are going to run tests in a new separate terminal

```
npm run test
```

Script for vulnerabilities scanning:

```
npm run docker:scan
```

## Create a collection in Postman

Import api.yaml to Postman.

> **_NOTE:_** only track, user, album, favs, artist endpoints are workable in a scope of the first-second part of the task.

## Testing

After application running open new terminal and enter:

> ⚠️ **_NOTE:_** Please, make sure that the app is running and you are going to ron tests in a new separate terminal!

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

> **_NOTE:_** you don't need to run tests, related to auth, refresh in a scope oh the first-second parts of this task!

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
