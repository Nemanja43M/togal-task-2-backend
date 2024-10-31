# File Service Backend

## Description

This backend service provides a file management system using MySQL for data storage and MinIO for object storage.

## Prerequisites

- **Docker** and **Docker Compose**: Ensure Docker and Docker Compose are installed on your system.
- **Node.js** and **npm**: Required for running scripts and managing dependencies.

## Technologies

- **Node.js**: Backend runtime.
- **TypeScript**: For type-safe JavaScript.
- **Express**: Web framework for building the API.
- **MySQL**: Relational database to manage file data.
- **MinIO**: Object storage service for storing and retrieving files.
- **Docker**: Containerization for MySQL and MinIO services.
- **ESLint**: Linting tool for code quality and consistency.
- **Winston**: Logging system for application monitoring.

## Installation

Install dependencies:

npm install

## Docker Setup

The Docker Compose file (docker-compose.yml) is configured to set up both MySQL and MinIO services.

Start Docker Services
To start MySQL and MinIO containers, run:

docker-compose up -d

## MySQL will be accessible at localhost:3306

## MinIO will be accessible at:

Console: localhost:9001
API: localhost:9000

## Development Scripts

Start Development Server: Starts the server using TypeScript.

npm run dev
