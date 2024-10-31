# Assistify-API

[Assistify API Documentation](https://assistify-api.fly.dev/docs)

Welcome to the **Assistify-API** repository! This is the backend service for Assistify, built with Python's FastAPI framework. It provides robust APIs for authentication, messaging, assistants, threads, and users, leveraging MongoDB for data storage.

## Table of Contents

- [Assistify-API](#assistify-api)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation and Setup](#installation-and-setup)
  - [Running the Application](#running-the-application)
  - [Database Migrations](#database-migrations)
    - [How Migrations Work](#how-migrations-work)
    - [Running Migrations](#running-migrations)
    - [Creating a New Migration](#creating-a-new-migration)
  - [Docker Usage](#docker-usage)
  - [Project Structure](#project-structure)
  - [Key Components](#key-components)
  - [Hatch Commands](#hatch-commands)
  - [Testing](#testing)
    - [Unit Tests](#unit-tests)
  - [API Documentation](#api-documentation)
  - [License](#license)
  - [Contact](#contact)

## Prerequisites

- **Python** (v3.10 or higher)
- **MongoDB** (local or remote instance)
- **OpenAI API Key**

## Environment Variables

The application requires the following environment variables:

- `MONGODB_URI`: Your MongoDB connection URI
- `MONGODB_DB`: The name of your MongoDB database
- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `OPENAI_API_KEY`: Your OpenAI API key for assistant functionalities

You can set these variables in a `.env` file at the root of the `assistify-api` directory.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dev3l/assistify.git
   cd assistify/assistify-api
   ```

2. **Set up environment variables**:

   Copy the `env.default` file to `.env` and fill in your actual values:

   ```bash
   cp env.default .env
   ```

   Update `.env` with your credentials:

   ```env
   MONGODB_URI=mongodb://<username>:<password>@<host>:<port>/<database>
   MONGODB_DB=assistify_db
   GOOGLE_CLIENT_ID=your_google_client_id
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Install dependencies**:

   Ensure you have **Hatch** installed:

   ```bash
   pip install hatch
   ```

   Create and activate the virtual environment:

   ```bash
   hatch env create
   ```

## Running the Application

To start the application locally, use the following command:

```bash
hatch run dev
```

The API will be available at `http://localhost:8000`.

## Database Migrations

The application uses a migration system similar to the Flyway pattern to manage database schema changes. Each migration script is executed once and only once, ensuring consistent database state across different environments.

### How Migrations Work

- **Migration Files**: Located in the `migrations/` directory, named with a version prefix, e.g., `v001_initial_setup.py`.
- **Version Control**: Each migration file's version is stored in the database to track which migrations have been applied.
- **Execution**: On application startup, the migration handler checks for new migration files that have not been executed yet and runs them in order.
- **Singleton Execution**: Migrations are executed only once to prevent redundant operations or data inconsistencies.

### Running Migrations

Migrations are automatically executed when you run:

```bash
hatch run migrations
```

This command ensures your database schema is up-to-date before the application starts.

### Creating a New Migration

1. **Create a Migration Script**:

   - Add a new Python file in the `migrations/` directory.
   - Name it with the next version number, e.g., `v002_add_new_collection.py`.

2. **Implement the Migration Logic**:

   - Define a `run(db: MongoDb, *args)` function.
   - Use the provided DAOs and models to manipulate the database schema or data.

   ```python
   import os
   from assistify_api.database.mongodb import MongoDb
   from assistify_api.database.version_control_wrapper import version_control

   version = os.path.splitext(os.path.basename(__file__))[0]

   @version_control(version)
   def run(db: MongoDb, *_):
       # Migration logic here
       pass
   ```

3. **Version Control Decorator**:

   - The `@version_control(version)` decorator ensures the migration runs once.
   - It records the migration version and status in the database.

4. **Test the Migration**:

   - Run the migrations command and verify the changes:

     ```bash
     hatch run migrations
     ```

## Docker Usage

You can build and run the application using Docker:

1. **Build the Docker image**:

   ```bash
   docker build -t assistify-api .
   ```

2. **Run the Docker container**:

   ```bash
   docker run -p 8000:8000 assistify-api
   ```

## Project Structure

```plaintext
assistify-api/
├── Dockerfile
├── hatch.toml
├── pyproject.toml
├── README.md
├── requirements.txt
├── .env
├── src/
│   ├── app/
│   │   ├── api.py
│   │   ├── auth/
│   │   │   └── verify_token.py
│   │   ├── messages/
│   │   │   ├── messages_router.py
│   │   │   └── messages_service.py
│   │   ├── threads/
│   │   │   ├── threads_router.py
│   │   │   └── threads_service.py
│   │   └── users/
│   │       ├── users_router.py
│   │       └── users_service.py
│   ├── database/
│   │   ├── dao/
│   │   │   ├── assistants_dao.py
│   │   │   ├── threads_dao.py
│   │   │   └── users_dao.py
│   │   ├── models/
│   │   │   ├── assistant.py
│   │   │   ├── message.py
│   │   │   ├── thread.py
│   │   │   └── user.py
│   │   ├── mongodb.py
│   │   ├── version_control_wrapper.py
│   │   └── migrations/
│   │       ├── v001_initial_setup.py
│   │       ├── v002_add_new_collection.py
│   │       └── ...
│   └── env_variables.py
└── tests/
    ├── test_api.py
    ├── test_messages_service.py
    └── test_threads_service.py
```

## Key Components

- **`api.py`**: Initializes the FastAPI application, including middleware, routers, and endpoints.
- **Authentication**:
  - **`verify_token.py`**: Verifies Google OAuth 2.0 tokens.
- **Messaging**:
  - **`messages_router.py`**: Defines endpoints for message-related operations.
  - **`messages_service.py`**: Handles the logic for sending and receiving messages.
- **Threads**:
  - **`threads_router.py`**: Manages conversation threads between users and assistants.
  - **`threads_service.py`**: Contains business logic for thread operations.
- **Users**:
  - **`users_router.py`**: Handles user-related API endpoints.
  - **`users_service.py`**: Manages user data and interactions.
- **Database Access Objects (DAOs)**:
  - **`assistants_dao.py`**, **`threads_dao.py`**, **`users_dao.py`**: Provide an abstraction layer over MongoDB operations.
- **Models**:
  - **`assistant.py`**, **`message.py`**, **`thread.py`**, **`user.py`**: Define data models using Pydantic.
- **Environment Variables**:
  - **`env_variables.py`**: Manages environment variables and configurations.
- **Migrations**:
  - **`migrations/`**: Contains migration scripts that are executed once and tracked in the database.
  - **`version_control_wrapper.py`**: Handles the execution and tracking of migration scripts.

## Hatch Commands

Hatch is used for environment management and running commands.

```bash
hatch run <command>
```

Available commands:

- **`dev`**: Runs the development server with hot-reloading.
- **`start-app`**: Starts the application using `uvicorn`. Main command to run the application.
- **`migrations`**: Executes database migrations to ensure the schema is up-to-date.
- **`test`**: Runs the test suite using `pytest` with coverage reporting.

## Testing

### Unit Tests

Run the test suite:

```bash
hatch run test
```

To monitor test coverage in your editor (e.g., VSCode with Coverage Gutters):

```bash
# In VSCode
Command + Shift + P => Coverage Gutters: Watch
```

## API Documentation

The API documentation is automatically generated using Swagger UI and can be accessed at:

- **Local**: `http://localhost:8000/docs`
- **Production**: [Assistify API Docs](https://assistify-api.fly.dev/docs)

## License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## Contact

Assistify is developed by Justin Beall of **Dev3loper.ai**.

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)

---

Ready to enhance your productivity with AI? Get started with Assistify today!
