# 🚀 Procurement Management System

A full-stack web application for managing suppliers and parts with dynamic procurement classification logic.

## 🛠️ Tech Stack

- **Backend:** Java, Spring Boot, Spring Data JPA
- **Frontend:** React, Ant Design
- **Database:** PostgreSQL
- **DevOps:** Docker, Docker Compose

## ✨ Features

- 📋 Supplier management — add, list and delete suppliers
- 🔩 Part management — add, list and delete parts
- 🔀 Dynamic MB (Make/Buy) classification logic — supplier selection is enabled only for outbound procurement types
- 🐳 Fully containerized with Docker

## 🚀 Getting Started

### Prerequisites
- Docker Desktop

### Run the application

```bash
docker-compose up --build
```

Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
procurement/
├── src/                  # Spring Boot backend
├── frontend/             # React frontend
├── Dockerfile            # Backend Docker config
└── docker-compose.yml    # Multi-container setup
```
