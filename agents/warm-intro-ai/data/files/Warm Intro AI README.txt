# Warm Intro AI

> **Automated AI Outreach for Busy Professionals**

Welcome to **Warm Intro AI**, an AI assistant that automates the creation of personalized outreach messages for busy professionals like consultants and entrepreneurs. Leveraging AI to analyze various personal and professional data, it helps craft messages that resonate, fostering valuable connections and potential collaborations through a client-centered approach.

The full product definition is available [here](./data/files/Warm Intro AI Product Definition.md).

## Table of Contents

- [Warm Intro AI](#warm-intro-ai)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Environment Variables](#environment-variables)
      - [Required](#required)
      - [Project](#project)
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

Warm Intro AI is an innovative AI-driven assistant aimed at revolutionizing professional connections for busy professionals. By automating the personalization of outreach messages, it enables users to engage effectively with potential clients through context-rich communications drawn from sources like LinkedIn profiles, conference bios, and CRM data.

## Features

- **AI-driven Personalized Outreach Messages**: Automate the creation of tailored messages.
- **Integration with CRM Platforms**: Seamlessly integrate with your existing CRM.
- **Context Analysis**: Analyze personal and professional data.
- **User-friendly Interface**: Designed for busy professionals.
- **Client-centered Communication Strategies**: Emphasize genuine engagement.

## Setup

### Prerequisites

- **Python** (v3.10 or higher)
- **OpenAI API Key**
- **Hatch** package manager (`pip install hatch`)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/DEV3L/assistify.git
   cd assistify/agents/warm-intro-ai
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

#### Project

- `ASSISTANT_NAME`: Warm Intro AI
- `ASSISTANT_DESCRIPTION`: Automated AI Outreach for Busy Professionals
- `DATA_FILE_PREFIX`: warm-intro-ai

## Usage

The Warm Intro AI uses the [ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager) for managing interactions.

### Running the Assistant

1. **Build the Assistant**:

   ```bash
   hatch run build
   ```

2. **Start a Chat Session**:

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

- **Assistant Description**: Warm Intro AI assists users in developing outreach communications that align with consultative selling approaches.
- **Users**: Designed for business development representatives, customer relationship managers, entrepreneurs, and professional consultants.
- **Alignment with "How Clients Buy"**: Emphasizes building trust, understanding client needs, and fostering authentic connections.

## License

This project is licensed under the **MIT License** - see the [LICENSE](../../LICENSE) file for details.

## Contact

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)

---

Happy connecting with Warm Intro AI!
