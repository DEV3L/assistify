# Assistify-API

[Assistify UI](https://assistify-api.fly.dev/)

## Prerequisites

- Python (v3.12 or higher)

## Environment Variables

The following environment variables are required:

- `MONGODB_URI`: Your Google OAuth client ID
- `GOOGLE_CLIENT_ID`: Your Google OAuth client secret
- `OPENAI_API_KEY`: A secret used to encrypt session tokens

## Installation/Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dev3l/assistify.git
   cd assistify/assistify-api
   ```

2. Copy the `env.default` file to a new file named `.env` and replace `OPENAI_API_KEY` with your actual OpenAI API key:

```bash
cp env.local .env
```

3. Setup a virtual environment with dependencies and activate it:

```bash
brew install hatch
hatch env create
```

## Running the Application

To start the application locally, you can use the following command:

```bash
hatch run start-app
```

Alternatively, you can run the application using `uvicorn` directly:

```bash
uvicorn src.app.api:api --host 0.0.0.0 --port 8000
```

## Docker Usage

To build and run the application using Docker, follow these steps:

1. Build the Docker image:

```bash
docker build -t assistify-api .
```

2. Run the Docker container:

```bash
docker run -p 8000:8000 assistify-api
```

## Hatch Commands

```bash
hatch run <command>
```

The following hatch commands are available:

- `dev`: Runs the development server using `python server.py`. This is useful for local development with hot-reloading.
- `start-app`: Starts the application using `uvicorn` with the specified host and port. This is the main command to run the application.
- `migrations`: Executes the database migrations by running the `handle_migrations.py` script. This ensures the database schema is up-to-date.
- `test`: Runs the test suite using `pytest` with coverage reporting. This is used to ensure the codebase is functioning correctly and to measure test coverage.

## Testing

### Unit Tests

```bash
hatch run test
```

With coverage for Coverage Gutters:

```bash
Command + Shift + P => Coverage Gutters: Watch
```
