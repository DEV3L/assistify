# Assistify

> A web platform for engaging with specialized OpenAI Assistants across various fields.

Welcome to **Assistify**! Our mission is to revolutionize professional workflows through the power of AI. Assistify connects you with specialized OpenAI Assistants to enhance productivity in programming, product management, content creation, and more. By integrating secure and user-friendly tools, we aim to democratize AI access, making it an indispensable asset for professionals across various fields.

View the full product definition [here](./PRODUCT_DEFINITION.md).

### PROD

- [Assistify UI](https://assistify-ui.vercel.app)
- [Assistify API](https://assistify-api.fly.dev/docs)

## Table of Contents

- [Assistify](#assistify)
  - [PROD](#prod)
  - [Table of Contents](#table-of-contents)
  - [Key Features](#key-features)
  - [Architecture Overview](#architecture-overview)
  - [Technology Stack](#technology-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Continuous Integration and Deployment](#continuous-integration-and-deployment)
    - [GitHub Actions Workflows](#github-actions-workflows)
  - [Testing Instructions](#testing-instructions)
    - [Backend Tests](#backend-tests)
    - [Frontend Tests](#frontend-tests)
    - [End-to-End Tests](#end-to-end-tests)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Key Features

- **AI-Powered Assistants**: Harness the power of OpenAI to provide expert support in real-time, transforming how you approach complex tasks.
- **Integrated Google Authentication**: Experience secure, hassle-free access with our integrated Google authentication.
- **User-Friendly Interface**: Navigate with ease through our streamlined and intuitive user interface designed for optimal user experience.
- **Admin Dashboard**: Control and customize your experience with our robust admin dashboard.
- **Third-Party Integrations**: Expand your capabilities with seamless integrations with tools you already use.
- **Continuous Improvement**: Your feedback drives our evolution, ensuring Assistify stays ahead with the features you need.

## Architecture Overview

Assistify is structured into several key components:

- **Backend (`assistify-api/`)**: Built with **Python FastAPI**, utilizing Pydantic for data validation and MongoDB for data storage. It provides APIs for authentication, messaging, assistants, threads, and users.
- **Frontend (`assistify-ui/`)**: Developed using **Next.js**, **React**, **Material-UI (MUI)**, and **TypeScript**, offering a user-friendly interface for interacting with AI assistants.
- **Agents (`agents/`)**: Contains configurations and code for specialized AI assistants, leveraging OpenAI's capabilities to deliver tailored support.
- **Testing Suites**: Comprehensive unit and integration tests ensure reliability and robustness across all components.

Each submodule (`assistify-api`, `assistify-ui`, `agents`) has its own README with detailed information and instructions.

## Technology Stack

- **Frontend**: Next.js for dynamic, server-side rendered user experiences.
- **Backend**: Python FastAPI for high-performance backend services.
- **Database Management**: MongoDB for flexible, document-based storage.
- **Authentication**: Google OAuth for secure user authentication.
- **Cloud Computing and Hosting**: Fly.io and Vercel for global availability and low-latency performance.
- **Integration**: Trello for enhanced project management capabilities.

## Getting Started

To get started with Assistify, follow the installation instructions provided in each submodule's README:

- [assistify-api README](./assistify-api/README.md)
- [assistify-ui README](./assistify-ui/README.md)
- [agents README](./agents/README.md)

### Prerequisites

- **Docker** and **Docker Compose** installed on your machine.
- An **OpenAI API key**.
- **Google OAuth** credentials (Client ID and Client Secret).
- **Trello API** credentials (if using Trello integration).

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dev3l/assistify.git
   cd assistify
   ```

2. **Set up environment variables**:

   Create a `.env` file in the root directory and add the required environment variables as specified in the submodules' READMEs. Example variables include:

   ```env
   # General
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   OPENAI_API_KEY=your_openai_api_key

   # MongoDB
   MONGODB_URI=mongodb://your_mongo_user:your_mongo_password@mongo:27017/
   MONGODB_DB=assistify_db

   # Trello (Optional)
   TRELLO_API_KEY=your_trello_api_key
   TRELLO_API_TOKEN=your_trello_api_token
   ```

3. **Start the application using Docker Compose**:

   ```bash
   docker-compose up --build
   ```

   This command builds and starts the backend, frontend, and MongoDB services defined in the `docker-compose.yml` file.

4. **Access the application**:

   - **Frontend**: Open your browser and navigate to `http://localhost:3000`.
   - **Backend API**: Access the API documentation at `http://localhost:8000/docs`.

## Continuous Integration and Deployment

We use GitHub Actions for Continuous Integration (CI) and Continuous Deployment (CD) to automate testing, building, and deployment processes.

### GitHub Actions Workflows

- **Continuous Integration (`.github/workflows/continuous-integration.yml`)**:
  - **Purpose**: Runs unit tests, integration tests, and code quality checks on every push and pull request.
  - **Key Features**:
    - Executes tests for both the backend (`assistify-api`) and frontend (`assistify-ui`).
    - Checks code formatting and linting.
    - Ensures that code changes do not break existing functionality.
- **End-to-End Integration Tests (`.github/workflows/end-to-end-integration.yml`)**:
  - **Purpose**: Runs end-to-end tests to validate the entire application workflow.
  - **Key Features**:
    - Simulates user interactions with the application.
    - Validates integration between frontend and backend.
    - Ensures that the application functions correctly from the user's perspective.
- **Fly Deploy (`.github/workflows/fly-deploy.yml`)**:
  - **Purpose**: Automates the deployment of the backend (`assistify-api`) to Fly.io.
  - **Key Features**:
    - Triggers on pushes to the `main` branch or when a new release is published.
    - Builds the Docker image and deploys it to Fly.io.
    - Manages environment variables and secrets securely.
- **Vercel Deploy (`.github/workflows/vercel-deploy.yml`)**:
  - **Purpose**: Automates the deployment of the frontend (`assistify-ui`) to Vercel.
  - **Key Features**:
    - Triggers on pushes to the `main` branch or when a new release is published.
    - Builds the Next.js application and deploys it to Vercel.
    - Handles environment variables and ensures smooth deployment.
- **Agent - Build - Assistify Concierge (`.github/workflows/agent-assistify-concierge-build.yml`)**:
  - **Purpose**: Automates the building and deployment of the Assistify Concierge agent.
  - **Key Features**:
    - Manually triggered workflow requiring an OpenAI API key.
    - Sets up the environment and installs dependencies.
    - Runs code extraction and builds the AI assistant.
    - Integrates with Trello for data extraction.
- **Agent - Build - Assistify Product Owner (`.github/workflows/agent-assistify-product-owner-build.yml`)**:
  - **Purpose**: Automates the building and deployment of the Assistify Product Owner agent.
  - **Key Features**:
    - Similar to the Concierge build workflow.
    - Manually triggered and requires an OpenAI API key.
    - Extracts code summaries and builds the AI assistant tailored for product owner insights.
- **Agent - Continuous Alignment Testing (CAT) (`.github/workflows/agent-assistify-product-owner-repeat-integration-tests.yml`)**:
  - **Purpose**: Performs Continuous Alignment Testing (CAT) to evaluate the consistency and reliability of non-deterministic AI responses.
  - **Key Features**:
    - Runs integration tests multiple times to determine the pass rate of non-deterministic AI outputs.
    - Soft assertions are used to calculate the percentage of successful responses.
    - Helps in monitoring the alignment of AI assistant behavior with expected outcomes over time.
    - Provides insights into the AI model's performance and guides improvements.
  - **Continuous Alignment Testing** is crucial for AI systems where responses may vary due to the inherent non-deterministic nature of AI models. This workflow ensures that the AI assistant maintains a high level of alignment with the desired behavior and outputs.

## Testing Instructions

### Backend Tests

Navigate to the `assistify-api` directory:

```bash
cd assistify-api
hatch env create
hatch run test
```

### Frontend Tests

Navigate to the `assistify-ui` directory:

```bash
cd assistify-ui
yarn install
yarn test
```

### End-to-End Tests

From the root directory:

```bash
cd assistify-ui
yarn install
yarn test:e2e
```

Ensure all tests pass before deploying or making significant changes.

## Contributing

We welcome contributions from the community! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear commit messages.
4. Open a pull request detailing your changes.

Please see the [Contributing Guidelines](./CONTRIBUTING.md) for more information.

## License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

## Contact

Assistify is developed by Justin Beall of **Dev3loper.ai**, a team dedicated to making AI accessible and practical for everyday professional tasks.

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)
- **Contact**: Visit our [contact page](https://www.dev3loper.ai/contact) for inquiries.

---

Ready to transform your workflow? Sign up today for a free trial or contact our sales team to learn more.

---

**Note**: The Continuous Alignment Testing (CAT) workflow is essential for maintaining the quality and reliability of AI assistants. By incorporating CAT, we ensure that our AI models remain aligned with user expectations and deliver consistent, valuable insights.
