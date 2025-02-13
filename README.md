# Tigar Tyres Internship Project <img width="7%" src="https://github.com/user-attachments/assets/1b8ea62d-6c2e-4c21-99f7-ffb0deaf429d"/>


Below can be found a short description of the project done as a part of an internship at Tigar Tyres company, part of Michelin group. Some parts we're not included in the [task](./Task.pdf), but were done to improve my technical skills.

## Technology Stack

| **Backend** | **Frontend** | **Components** | **Database** | **Application** |
| --- | --- | --- | --- | --- |
| [ ![.NET](https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=fff)](#) | [![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#) | [![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff)](#) | [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) | [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#) |


## Services

Docker-compose is used to build and orchestrate all the services. Each of them could be started separately and locally as well.

`web-api` service contains C# backend API with DB and Entity Framework.

`web-app` service contains Angular 18 Web App.

`postgres` service contains PostgresDB.

## Build

To build containers navigate to the root folder containing docker-compose.yml file and execute:

```bash
> docker-compose up --build --detach
```

Inside Docker web_api runs on http://localhost:8001

Inside Docker web_app runs on http://localhost:4200

Tested on: macOS Sequoia 15.3.1

## 🚀 Quickstart

```bash
> git clone https://github.com/svetlanamancic/Tigar_Tyres
> cd Tigar_Tyres

> docker compose up --build --detach
```

## Screens

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/e9b52650-72e0-490c-9953-a6f917401b62" />

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/8d0b2170-2b4e-4a27-a6fc-5a2c23dceace" />

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/65f03442-b89d-468a-89b0-d3da2ad8c89f" />

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/92b5313c-2b64-4e58-8986-dff7fe4ec193" />

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/d5dc6ef8-6572-4b89-b0fc-8fc5be5bb1fe" />

<img width="1800" alt="image" src="https://github.com/user-attachments/assets/b5d38a8c-c6f9-46dc-bcc2-ac64215d1096" />







