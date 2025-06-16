# 📚 **Home Library Service**

A Node.js REST API for managing a home library service.

---

## ⚙ **Prerequisites**

- [Git](https://git-scm.com/downloads) — download & install.
- [Node.js](https://nodejs.org/en/download/) — includes `npm`.
- [Docker](https://docs.docker.com/engine/install/) — required for DB & containerized runs.

---

## 🚀 **Clone the repository**

```bash
git clone https://github.com/potatosim/nodejs2025Q2-service.git
cd nodejs2025Q2-service
git checkout feature/part-3
```

---

## 🌱 **Setup environment variables**

- Copy `.env.example` → rename to `.env`
- Edit if necessary.

---

## 🖥 **Run locally**

> ⚠️ **Note:** Before starting the app locally, run these scripts:

```bash
npm install
npm run docker:build-postgres
npm run docker:run-postgres
npm run prisma:migrate
npm run start:dev
```

---

## 🐳 **Run with Docker**

### Development mode

Runs app & DB containers, with auto-reload on source changes:

```bash
npm run docker:run-dev
```

### Production mode

Runs app & DB containers, checks auto-restart on crash:

```bash
npm run docker:run-prod
```

---

## ✅ **Testing**

> ⚠️ **Note:** Make sure the app is running. Open a new terminal for tests.

### Run all tests with authorization:

```bash
npm run test:auth
```

### Refresh tests:

```bash
npm run test:refresh
```

### Run a specific test suite:

```bash
npm run test:auth -- <path to suite>
```

---

## 🛠 **Linting & formatting**

```bash
npm run lint
npm run format
```

---

## 📬 **API testing**

Import `api.yaml` into Postman to test API endpoints.

---

## 🐞 **Debugging in VSCode**

- Press F5 to start debugging.
- More info: [VSCode debugging docs](https://code.visualstudio.com/docs/editor/debugging)
