# Assistify - Product Owner

Meet the **Assistify Product Owner**, your AI-powered head of product management. This agent excels in product management, agile methodologies, and AI technologies, providing strategic insights, managing product backlogs, and refining user stories seamlessly.

Read the full product definition [here](./AI-XP Product Owner Product Definition.md).

## Table of Contents

- [Assistify - Product Owner](#assistify---product-owner)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
      - [Required](#required)
      - [Project](#project)
      - [Trello](#trello)
  - [Usage](#usage)
    - [Running the Assistant](#running-the-assistant)
  - [Testing](#testing)
    - [End-to-End Test](#end-to-end-test)
    - [Unit Tests](#unit-tests)
    - [Coverage Gutters](#coverage-gutters)
  - [Additional Information](#additional-information)
  - [License](#license)
  - [Contact](#contact)

## Introduction

Access the Assistify Product Owner for expert guidance on product development and optimization. It provides insights into project statuses, technical decisions, and future plans.

## Features

- **Product Backlog Management**: Helps manage and prioritize product backlogs.
- **Strategic Insights**: Offers advice on product strategy and roadmap planning.
- **User Story Refinement**: Assists in refining user stories and acceptance criteria.
- **Agile Methodologies**: Provides guidance on agile practices and workflows.

## Setup

### Prerequisites

- **Python** (v3.10 or higher)
- **OpenAI API Key**
- **Trello API Key and Token**
- **Hatch** package manager (`pip install hatch`)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DEV3L/assistify.git
   cd assistify/agents/assistify-product-owner
   ```

2. **Copy the environment variables template**:

   ```bash
   cp env.default .env
   ```

3. **Install dependencies and activate the virtual environment**:

   ```bash
   hatch env create
   hatch shell
   ```

### Environment Variables

Configure the following variables in your `.env` file:

#### Required

- `OPENAI_API_KEY`: Your OpenAI API key.
- `TRELLO_API_KEY`: Your Trello API key.
- `TRELLO_API_TOKEN`: Your Trello API token.

#### Project

- `ASSISTANT_NAME`: Assistify - Product Owner
- `ASSISTANT_DESCRIPTION`: Product owner tech insights using AI for Assistify
- `DATA_FILE_PREFIX`: Assistify - Product Owner

#### Trello

- `TRELLO_BOARD_NAME`: The name of your Trello board (e.g., Assistify)

## Usage

The Assistify Product Owner uses the [ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager) for managing interactions.

### Running the Assistant

1. **Extract Trello Data**:

   ```bash
   hatch run trello-extract
   ```

2. **Summarize Code**:

   Generate code summaries from the Assistify codebase:

   ```bash
   hatch run summary path/to/assistify-api
   hatch run summary path/to/assistify-ui
   ```

3. **Build the Assistant**:

   ```bash
   hatch run build
   ```

4. **Start a Chat Session**:

   ```bash
   hatch run chat
   ```

## Testing

### End-to-End Test

Run an end-to-end test:

```bash
hatch run e2e
```

### Unit Tests

Execute unit tests:

```bash
hatch run test
```

### Coverage Gutters

To visualize code coverage in your editor:

```bash
Command + Shift + P => Coverage Gutters: Watch
```

## Additional Information

- **Data Sources**: Utilizes Trello board data and code summaries to provide detailed product insights.
- **Open Source Libraries**: Leverages [ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager), [ai-code-summary](https://github.com/DEV3L/ai-code-summary), and [ai-trello-extract](https://github.com/DEV3L/ai-trello-extract).

## License

This project is licensed under the **MIT License** - see the [LICENSE](../../LICENSE) file for details.

## Contact

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)

---

Optimize your product development with the Assistify Product Owner!
