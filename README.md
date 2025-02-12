# Tigar Tyres Internship Project

Below can be found a short description of the project done as a part of an internship at Tigar Tyres company, part of Michelin group. Some parts we're not included in the [task](./Task.pdf), but were done to improve my technical skills.

## Technology Stack

| **Backend** | **Frontend** | **Components** | **Database** | **Container Management** |
| --- | --- | --- | --- | --- |
| [ ![.NET](https://img.shields.io/badge/.NET-512BD4?logo=dotnet&logoColor=fff)](#) | [![Angular](https://img.shields.io/badge/Angular-%23DD0031.svg?logo=angular&logoColor=white)](#) | [![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=fff)](#) | [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#) | [![Docker](https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=fff)](#) |


## Services

Docker-compose is used to build and orchestrate all the services. Each of them could be started separately and locally as well.

`web-api` service contains C# backend API with DB and Entity Framework.

`web-app` service contains Angular Web App.

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

### Project Task

[Here](./Task.pdf) can be found internship task.




