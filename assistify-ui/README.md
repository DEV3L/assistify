# Assistify-UI

Assistify is a web application that allows you to interact with specialized OpenAI Assistants to boost your productivity across various domains.

[Assistify UI](https://assistify-ui.vercel.app/)

## Table of Contents

- [Assistify-UI](#assistify-ui)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Installation and Setup](#installation-and-setup)
  - [Running the Application](#running-the-application)
    - [Running Tests](#running-tests)
    - [Running the Development Server](#running-the-development-server)
  - [Project Structure](#project-structure)
  - [Key Components and Libraries](#key-components-and-libraries)
  - [Updating API Types](#updating-api-types)
  - [Linting](#linting)
  - [End-to-End Testing](#end-to-end-testing)
  - [License](#license)
  - [Contact](#contact)

## Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** package manager

## Environment Variables

The application requires the following environment variables:

- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `NEXTAUTH_SECRET`: A secret used to encrypt session tokens
- `NEXTAUTH_URL`: The base URL of your application (e.g., `http://localhost:3000`)
- `NEXT_PUBLIC_API_BASE_URL`: The base URL of the Assistify API (e.g., `http://localhost:8000`)

Copy the `.env.default` file to `.env.local` and set the variables:

```bash
cp .env.default .env.local
```

Update `.env.local` with your credentials.

## Installation and Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/dev3l/assistify.git
   cd assistify/assistify-ui
   ```

2. **Install dependencies**:

   ```bash
   yarn install
   ```

## Running the Application

### Running Tests

To run the unit tests:

```bash
yarn test
```

### Running the Development Server

Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Project Structure

```plaintext
assistify-ui/
├── components/
│   ├── common/
│   ├── assistants/
│   ├── dashboard/
│   ├── layout/
│   └── user/
├── contexts/
├── hooks/
├── pages/
│   ├── api/
│   ├── assistants.tsx
│   ├── dashboard.tsx
│   ├── index.tsx
│   └── user.tsx
├── public/
├── services/
├── styles/
├── tests/
│   ├── unit/
│   └── e2e/
├── types/
├── .env.local
├── jest.config.js
├── next.config.js
├── package.json
├── README.md
├── tailwind.config.js
└── tsconfig.json
```

## Key Components and Libraries

- **Next.js**: The React framework for production.
- **React**: A JavaScript library for building user interfaces.
- **NextAuth.js**: Authentication for Next.js applications.
- **Material-UI (MUI)**: A popular React UI framework.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **Jest**: JavaScript testing framework.
- **Testing Library**: Testing utilities that encourage good testing practices.
- **Playwright**: End-to-end testing framework.

## Updating API Types

The API types are automatically generated from the OpenAPI specification provided by the Assistify API.

To update the API types:

```bash
yarn update:local-api-types
```

This command fetches the latest API schema from the local API server and updates `src/types/AssistifyApiTypes.ts`.

## Linting

To run the linter and fix issues:

```bash
yarn lint
yarn lint:fix
```

## End-to-End Testing

End-to-end testing is performed using **Playwright**. The following environment variables are required for running the tests:

- `GOOGLE_TEST_NAME`: The name of the Google test user
- `GOOGLE_TEST_EMAIL`: The email of the Google test user
- `GOOGLE_TEST_PASSWORD`: The password of the Google test user
- `BASE_URL`: The base URL of the application under test (e.g., `http://localhost:3000`)

Set these variables in your `.env.local` file or export them in your shell before running tests.

To run the end-to-end tests:

```bash
yarn test:e2e
```

## License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## Contact

Assistify is developed by Justin Beall of **Dev3loper.ai**.

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)

---

Ready to enhance your productivity with AI? Get started with Assistify today!
