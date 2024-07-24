# Assistify-API

## Setup

1. Copy the env.local file to a new file named .env and replace `OPENAI_API_KEY` with your actual OpenAI API key:

```bash
cp env.local .env
```

2. Setup a virtual environment with dependencies and activate it:

```bash
brew install hatch
hatch env create
hatch shell
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

## Testing

### Unit Tests

```bash
hatch run test
```

With coverage for Coverage Gutters:

```bash
Command + Shift + P => Coverage Gutters: Watch
```
