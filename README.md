# FastChatAPI

A robust FastAPI application that integrates with OpenAI's API to facilitate seamless conversation capabilities through a RESTful interface.

[Assistants API Beta](https://platform.openai.com/docs/assistants/overview)

## Project Description

FastChatAPI is a Python-based web application built with FastAPI, providing a RESTful interface for chat operations powered by OpenAI's language models. This application enables seamless conversations for various use cases such as customer support, content generation, and interactive educational tools.

### Features

- **RESTful Endpoints:** Intuitive API endpoints for chat initiation, message sending, and response retrieval.
- **OpenAI Integration:** Leverages OpenAI’s API for generating conversational responses.
- **Context Management:** Maintains conversation context across multiple interactions.
- **Asynchronous Processing:** Efficient handling of multiple API requests using async programming.
- **Robust Error Handling:** Comprehensive error handling and logging mechanisms.

## Setup

1. Clone the repository:

```bash
git clone https://github.com/DEV3L/fast-chat-api
cd assistant-api
```

2. Copy the env.local file to a new file named .env and replace `OPENAI_API_KEY` with your actual OpenAI API key:

```bash
cp env.local .env
```

3. Setup a virtual environment with dependencies and activate it:

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
docker build -t fast-chat-api .
```

2. Run the Docker container:

```bash
docker run -p 8000:8000 fast-chat-api
```

## Testing

### Unit Tests

```bash
pytest
```

With coverage:

```bash
pytest --cov
```

With coverage for Coverage Gutters:

```bash
pytest --cov --cov-report lcov

Command + Shift + P => Coverage Gutters: Watch
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The configuration can be found in the `.github/workflows` directory.

The CI pipeline includes steps for:

- Checking out the code
- Setting up Python
- Installing dependencies
- Running unit tests
- Deploying to Fly.io

For more details, refer to the [continuous-integration.yml](.github/workflows/continuous-integration.yml) and [fly-deploy.yml](.github/workflows/fly-deploy.yml) files.
