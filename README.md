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

1. Run the main script:

```bash
python run_chat.py
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
