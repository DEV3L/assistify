# Assistify-UI

Assistify is a web app that allows you to manage your tasks and projects.

[Assistify UI](https://assistify-wine.vercel.app/)

## Prerequisites

- Node.js (v18 or higher)
- Yarn package manager

## Environment Variables

The following environment variables are required:

- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `NEXTAUTH_SECRET`: A secret used to encrypt session tokens
- `NEXTAUTH_URL`: Redirect URL from auth provider

The following NextJS environment variables are required:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL of the API

Copy the `.env.default` file to `.env.local` and set the variables.

## Major Components / Libraries Used

- **Next.js**: The React framework for production
- **React**: A JavaScript library for building user interfaces
- **NextAuth.js**: Authentication for Next.js applications
- **Tailwind CSS**: A utility-first CSS framework
- **Jest**: JavaScript testing framework
- **Testing Library**: Simple and complete testing utilities that encourage good testing practices

## Installation/Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/dev3l/assistify.git
   cd assistify/assistify-ui
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

## Running the Server

### Running Tests

To run the tests:

```bash
yarn test
```

### Running the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Linting

To run the linter:

```bash
yarn lint
```
