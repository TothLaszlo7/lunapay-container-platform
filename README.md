# LunaPay Container Platform

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=black" />
  <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker_Compose-2496ED?logo=docker&logoColor=white" />
</p>

> Infrastructure-focused portfolio project for containerizing and running the LunaPay personal finance application with Docker and Docker Compose.

---

## Project Status

This is a **portfolio / learning project** created to practice Docker-based application packaging and production-like local development workflows.

The goal of this project is not only to run the frontend inside a container, but to understand how modern containerized applications are built, configured, started, and troubleshooted in a reproducible way.

The project currently focuses on:

* Dockerfile-based frontend containerization
* Docker image creation
* Running a Vite/React application inside a container
* Docker port mapping
* Docker Compose workflow
* Runtime environment variable handling
* Layer-by-layer troubleshooting
* Preparing a future multi-container setup

---

## About The Project

LunaPay Container Platform is the containerized runtime environment for the LunaPay personal finance application.

The main LunaPay application focuses on the product itself, while this repository focuses on the infrastructure and containerization side of the project.

The project demonstrates how a frontend application can be:

* packaged into a Docker image
* started as a running container
* exposed to the host machine through port mapping
* configured with runtime environment variables
* managed through Docker Compose
* prepared for future backend and reverse proxy integration

The main goal was to understand how the following components work together:

* React frontend application
* Vite development server
* Firebase configuration
* Dockerfile
* Docker image
* Docker container
* Docker port mapping
* Docker Compose
* `.dockerignore`
* runtime `.env` configuration

---

## High-Level Architecture

Current local development architecture:

```text
Browser
  ↓
localhost:5173
  ↓
Docker port mapping
  ↓
Frontend container
  ↓
Vite React application
  ↓
Firebase services
```

Current Docker Compose flow:

```text
Developer
  ↓
docker compose up --build
  ↓
docker-compose.yml
  ↓
Build frontend image from ./frontend
  ↓
Start frontend container
  ↓
Load environment variables from frontend/.env
  ↓
Expose application on localhost:5173
```

Planned future architecture:

```text
Browser
  ↓
Nginx reverse proxy
  ↓
Frontend container
  ↓
Backend container
  ↓
Database / external services
```

---

## Built With

### Frontend

* React
* Vite
* Firebase
* React Router

### DevOps & Platform

* Docker
* Dockerfile
* Docker Compose
* `.dockerignore`
* Runtime environment variables

### Planned Backend

* Node.js
* Express.js
* Database integration

---

## Main Features

### Containerization

* Frontend Dockerfile for the Vite/React application
* Node.js Alpine-based image
* Dependency installation inside the container
* Vite dev server exposed on port `5173`
* `--host 0.0.0.0` configuration for container accessibility

### Docker Compose

* Initial `docker-compose.yml` setup
* Frontend service definition
* Local port mapping
* Runtime environment variable loading with `env_file`
* Reproducible local startup command

### Configuration

* Local `.env` file support
* Firebase environment variables loaded at runtime
* Secrets and local configuration kept outside the Docker image

### Troubleshooting

* Container status checks with `docker ps`
* Port mapping verification
* Host-to-container testing with `curl`
* Browser console inspection
* Firebase configuration error diagnosis

---

## Project Structure

```text
lunapay-container-platform/
│
├── frontend/
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── package.json
│   ├── package-lock.json
│   ├── public/
│   └── src/
│
├── backend/
│   └── Currently empty / planned backend service
│
├── docker-compose.yml
└── README.md
```

---

## Docker Compose Flow

```text
Developer command
  ↓
docker compose up --build
  ↓
Docker Compose reads docker-compose.yml
  ↓
Frontend image is built from ./frontend
  ↓
Container is started
  ↓
Environment variables are loaded from frontend/.env
  ↓
Port 5173 is mapped from container to host
  ↓
Application is available at localhost:5173
```

Docker Compose replaces the longer manual Docker command and makes the local workflow easier to reproduce.

---

## Prerequisites

To run this project locally, the following tools are required:

* Git
* Docker
* Docker Compose

Node.js and npm are not required on the host machine for the Docker workflow, because dependencies are installed inside the container.

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/TothLaszlo7/lunapay-container-platform.git
cd lunapay-container-platform
```

---

### 2. Create the frontend environment file

The frontend uses Firebase configuration through environment variables.

Create a local `.env` file inside the `frontend` folder:

```text
frontend/.env
```

Example structure:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

The real `.env` file should not be committed to GitHub.

---

### 3. Start the application with Docker Compose

From the project root, run:

```bash
docker compose up --build
```

The frontend should be available at:

```text
http://localhost:5173
```

---

### 4. Stop the application

Press:

```text
CTRL + C
```

If needed, remove stopped containers with:

```bash
docker compose down
```

---

## Manual Docker Workflow

The frontend can also be built and run manually without Docker Compose.

### Build the frontend image

From the `frontend` folder:

```bash
cd frontend
docker build -t lunapay-frontend .
```

### Run the frontend container

From the `frontend` folder:

```bash
docker run --rm \
  --name lunapay-frontend-container \
  -p 5173:5173 \
  --env-file .env \
  lunapay-frontend
```

Then open:

```text
http://localhost:5173
```

---

## Useful Commands

Check running containers:

```bash
docker ps
```

Check all containers, including stopped ones:

```bash
docker ps -a
```

Check local Docker images:

```bash
docker images
```

Build the frontend image manually:

```bash
docker build -t lunapay-frontend ./frontend
```

Start the project with Docker Compose:

```bash
docker compose up --build
```

Stop Docker Compose services:

```bash
docker compose down
```

Test the frontend from the host machine:

```bash
curl http://localhost:5173
```

---

## Environment Variable Handling

This project keeps runtime configuration separate from the Docker image.

The `.env` file is not copied into the image. Instead, it is passed to the running container at runtime.

This is important because different environments may use different configuration values:

```text
development
testing
production
```

This keeps the Docker image reusable and avoids hardcoding secrets or environment-specific values into the image.

---

## Troubleshooting

### The container is running, but the page does not load

First, check if the container is running:

```bash
docker ps
```

Expected port mapping:

```text
0.0.0.0:5173->5173/tcp
```

Then test the application from the host machine:

```bash
curl http://localhost:5173
```

If HTML is returned, Docker networking is working and the issue is likely in the browser or application layer.

---

### Wrong port

The Vite application uses port:

```text
5173
```

Make sure the browser URL is:

```text
http://localhost:5173
```

A common mistake is typing a similar but incorrect port number.

---

### Firebase error: invalid API key

If the browser console shows an error similar to:

```text
Firebase: Error (auth/invalid-api-key)
```

then the Firebase environment variables are probably missing or incorrect.

Check that:

* `frontend/.env` exists
* the required `VITE_FIREBASE_*` variables are defined
* Docker Compose is loading the env file correctly
* the container was restarted after changing environment variables

---

### Port already in use

If port `5173` is already used by another process, stop the existing process or change the port mapping in `docker-compose.yml`.

---

## Security Notes

This project was built with security awareness in mind.

Important security-related practices:

* Local `.env` files should not be committed.
* Firebase configuration should be handled through environment variables.
* Secrets and environment-specific values should not be hardcoded into the Docker image.
* Runtime configuration should be passed to the container when it starts.
* Before publishing or sharing the project, always check that no secrets, tokens, passwords or private keys are included in the repository history.

---

## Quality & Validation

The current Docker setup was validated through:

* Docker image build
* container startup
* Docker Compose startup
* browser testing
* `curl` testing from the host machine
* Docker port mapping inspection
* browser console debugging
* Firebase environment variable troubleshooting

Example validation commands:

```bash
docker build -t lunapay-frontend ./frontend
docker compose up --build
docker ps
curl http://localhost:5173
```

---

## Lessons Learned

This project helped me gain hands-on experience with Docker and containerized development workflows.

Key learning areas:

* how a Dockerfile defines an application image
* how an image becomes a running container
* how Docker port mapping connects the host machine to a container
* why Vite needs `--host 0.0.0.0` inside Docker
* why `.dockerignore` is important for clean build contexts
* why environment variables should be passed at runtime
* how Docker Compose simplifies local startup
* how to troubleshoot a containerized application layer by layer
* how to separate application code from runtime configuration

The most valuable part of the project so far was seeing that a running container does not automatically mean the application is correctly configured. The container, network, application and configuration layers all need to be checked separately.

---

## Future Improvements

Planned or possible improvements:

* Add `.env.example`
* Add backend service container
* Extend Docker Compose to a multi-container setup
* Add production frontend build
* Serve production frontend through Nginx
* Add reverse proxy configuration
* Add separate development and production Compose files
* Add architecture diagram
* Add backend API integration
* Add database container or managed database integration
* Add CI validation for Docker builds
* Add screenshots to the README
* Add production-like deployment notes

---

## Author

**Laszlo Toth**

GitHub: https://github.com/TothLaszlo7

LinkedIn: https://www.linkedin.com/in/laszlo-toth-it
