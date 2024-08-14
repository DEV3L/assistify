# Assistify - Product Owner

Meet the Assistify Product Owner, your AI-powered Head of Product.

This agent excels in product management, agile methodologies, and AI technologies.

Get strategic insights, manage product backlogs, and refine user stories seamlessly.

Access the Assistify Product Owner for expert guidance on product development and optimization.

[Assistants API Beta](https://platform.openai.com/docs/assistants/overview)

## Setup

### 1: Register for Trello API Access

1. **Sign Up for a Trello Account**:
   - If you don't have a Trello account, sign up at [Trello](https://trello.com/).
2. **Get API Key and Token**:
   - Go to the [Trello Developer Portal](https://trello.com/app-key).
   - Copy your API Key.
   - Click on the "Token" link to generate a token. This token will be used for authentication in your API requests.

### 2. Clone the repository:

```bash
git clone https://github.com/DEV3L/assistify
cd ./assistify/agents/assistify-product-owner
```

Copy the env.local file to a new file named .env and replace the placeholder environment variables:

```bash
cp env.default .env
```

#### Environment Variables

The following environment variables can be configured in the `.env` file:

##### Required

- `OPENAI_API_KEY`: The OpenAI API key
- `TRELLO_API_KEY`: The Trello API key
- `TRELLO_API_TOKEN`: The Trello API token

##### OpenAI

- `OPENAI_API_KEY`: The OpenAI API key

##### Project

- `ASSISTANT_DESCRIPTION`: Product owner tech insights using AI for Assistify
- `ASSISTANT_NAME`: Assistify - Product Owner
- `DATA_FILE_PREFIX`: Assistify - Product Owner

##### Trello

- `TRELLO_API_KEY`: The Trello API key
- `TRELLO_API_TOKEN`: The Trello API token
- `TRELLO_BOARD_NAME`: Assistify

### 3. Setup a virtual environment with dependencies and activate it:

```bash
brew install hatch
hatch env create
hatch shell
```

#### Usage

The `run_chat.py` script will:

> hatch run chat

1. Load or Create a new assistant
2. Start a chat thread with the assistant
3. Read input from the command line

The `run_end_to_end.py` script will:

> hatch run e2e

1. Create a new assistant
2. Send a message to the assistant
3. Remove the assistant

## Testing

### End to End Test

```bash
hatch run e2e
```

### Unit Tests

```bash
hatch run test
```
