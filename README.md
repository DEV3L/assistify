# Assistify

# PROD

[Assistify UI](https://assistify-ui.vercel.app)
[Assistify API](https://assistify-api.fly.dev/docs)

# CI

[Assistify UI CI](https://assistify-ui-ci.vercel.app)
[Assistify API CI](https://assistify-api-ci.fly.dev/docs)

> A web platform for engaging with specialized OpenAI Assistants across various fields.

Assistify is a web-based application that connects users with specialized OpenAI Assistants, streamlining interactions in areas like programming, product management, and content creation. By providing a common platform for accessing diverse AI assistants, it offers personalized support across various professional domains. Integrating Google authentication for security and using a provider-supplied OpenAI API key simplifies access, enabling a broader user base to benefit from AI-enhanced productivity tools. With future plans for a subscription-based model, Assistify aims to evolve into a marketplace for AI assistants, fostering innovation and collaboration among its users.

## Product Definition

Assistify is pioneering a unified platform that facilitates seamless interaction between users and specialized OpenAI Assistants. Catering to a wide array of professional needs, from software development and product management to content creation, it simplifies the integration of AI into daily workflows. Users can access a curated selection of assistants for guidance, creativity, and decision-making support, enabling enhanced productivity and innovation.

The platform’s key distinction lies in its user-friendly interface, which requires no technical setup from the user’s side. By leveraging a single provider-supplied OpenAI API key, Assistify removes barriers to entry, making cutting-edge AI accessible to a wider audience without the need for individual API management. This approach not only democratizes access to AI but also ensures a secure and personalized experience through Google authentication.

As Assistify evolves, it aims to introduce a subscription model and develop into a marketplace for AI assistants. This will allow users to subscribe to advanced features or access specialized assistants tailored to their unique needs. The platform’s growth will be supported by a robust technology stack, including Next.js, Python FastAPI, PostgreSQL, and comprehensive authentication and cloud hosting solutions. This ensures scalability, performance, and a seamless user experience.

Through its innovative offerings, Assistify is set to transform the way professionals engage with AI, making it an indispensable tool in the rapidly evolving digital landscape. The platform’s focus on accessibility, security, and customization positions it as a leader in the AI-assisted productivity and collaboration tools sector.

### Problem

Navigating the complexities of integrating AI into professional workflows remains a significant challenge for many users. The requirement for individuals to manage their own OpenAI API keys presents a technical and accessibility barrier, limiting the use of AI-enhanced productivity tools. Assistify seeks to address this issue by eliminating the need for users to supply API keys, providing a more accessible and user-friendly platform for engaging with AI assistants across various professional domains.

### North Star

The North Star for Assistify revolves around democratizing access to AI for professional enhancement, with a focus on simplifying the user experience and fostering widespread adoption. Success will be measured by the platform’s ability to attract and retain a diverse user base, the volume of AI interactions facilitated, and the growth of the marketplace for AI assistants. Key metrics include the number of active users, satisfaction rates, and the engagement levels with AI assistants. Achieving these goals will indicate that Assistify has successfully bridged the gap between complex AI technologies and everyday professional use, making it a central hub for AI-enhanced productivity.

### Product Vision

Assistify aims to redefine the integration of AI into professional workflows, becoming the premier platform for accessible, seamless interaction with AI assistants. By providing a provider-supplied API key and transitioning towards a subscription-based marketplace, Assistify will empower users to effortlessly engage with AI without technical complexities. The vision extends to creating a community where professionals can discover, use, and offer AI-enhanced services, fostering a collaborative ecosystem of innovation. As the platform evolves, it will continue to break down barriers to AI adoption, ensuring that advanced AI tools are within reach of every professional, irrespective of their technical expertise.

### Business Case

Assistify’s revised business model, which eliminates the need for individual OpenAI API keys and moves towards a provider-supplied key with a future subscription-based marketplace, significantly broadens its user base. This approach not only simplifies access to AI-assisted tools but also enhances the platform’s value proposition by offering specialized assistant services on-demand. Key revenue streams will include subscriptions for premium features and a marketplace where users can access or offer specialized AI assistants. This model positions Assistify as a pivotal player in the AI productivity tools market, catering to a diverse range of professional needs while paving the way for innovative AI applications and collaborations.

### Key Features

#### Summary

- Web-based chat interface for seamless interaction with specialized OpenAI Assistants.
- Provider-supplied OpenAI API key, removing the need for individual users to manage API keys.
- Google authentication for secure, personalized access to the platform.
- Future subscription-based model and marketplace for accessing or offering specialized AI assistants.
- Admin dashboard for managing assistant assignments and access for users.
- Comprehensive thread history viewing capabilities to track previous interactions and enhance continuity.
- Integration with third-party services like Trello, enabling users to pull in data for a richer, more contextual AI interaction.
- Feedback mechanism for users to influence the platform’s development and assistant offerings.
- Planned support for multimedia interactions within the chat interface to accommodate a wide range of assistant applications.

#### Epics

- **Chat Interface:**  
  Implementing a web-based chat interface that emulates similar functionalities as ChatGPT, tailored for user interactions with specialized OpenAI Assistants across various contexts such as programming, product management, content creation, and entrepreneurial POC development.

- **Authentication and Security:**
  Secure user authentication and OpenAI API key management system enabling personalized and secure access to Assistify, supporting diverse user roles including engineers, product owners, content creators, and entrepreneurs.

- **Admin Dashboard:**
  Admin dashboard for dynamic assistant management, allowing administrators to assign or modify assistant access for users, and manage specialized assistants like Knowledge Bot, Amazon Treasure Chat, and the virtual product owner for tailored user interactions.

- **Feedback Loop:**
  A feature enabling users to provide continuous feedback on their experience with the AI assistants, empowering developers to iteratively improve the application based on user insights and interactions.

### Technology

- **Frontend Development:** Next.js for a dynamic, server-side rendered user experience, complemented by React for rich interactive UI components.
- **Backend Services:** Python FastAPI for high-performance backend services, offering fast, asynchronous request handling.
- **AI and Machine Learning:** OpenAI’s API for conversational AI integration, enabling diverse assistant functionalities.
- **Database Management:** PostgreSQL for robust, scalable data storage solutions, ensuring data integrity and performance.
- **Authentication:** Google OAuth for secure user authentication and management, providing a seamless login experience.
- **Cloud Computing and Hosting:** Fly.io for application deployment, ensuring global availability and low-latency performance.
- **Third-Party Integrations:** Trello for project management capabilities, with potential for future integration with other services to enhance the platform’s utility.
- **Development Tools:** GitHub for version control, Docker for containerization, and CI/CD pipelines for automated testing and deployment, ensuring code quality and operational efficiency.

### Users

- **Content Creators:**
  Individuals seeking assistance with technical content creation, leveraging a personal knowledge bot.

- **Engineers:**
  Engineers on a team looking to work with a knowledgeable AI pair programming partner with access to the entire codebase.

- **Entrepreneurs:**
  Entrepreneurs and individuals exploring AI development work, interacting with custom agents for proofs of concept on their product ideas.

- **Product Owners:**
  Product owners seeking detailed knowledge about their product, including documentation, integration with tools like Trello, and the codebase.

---

## Setup

1. Clone the repository:

```bash
git clone https://github.com/DEV3L/assistify
cd assistify
```

### API / Backend

Navigate to the API directory and follow the [Assistify API README.md](assistify-api/README.md) instructions.

### UI / Front-End

Navigate to the UI directory and follow the [Assistify UI README.md](assistify-ui/README.md) instructions.

### Docker

#### Environment Variables

The following environment variables are required:

- `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
- `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
- `NEXTAUTH_SECRET`: A secret used to encrypt session tokens
- `OPENAI_API_KEY`: The OpenAI API key

Copy the `.env.default` file to `.env` and set the variables.

#### Run the Stack

```bash
source .env
docker-compose up
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- MongoDB: localhost:27017

## Continuous Integration

This project uses GitHub Actions for continuous integration. The configuration can be found in the `.github/workflows` directory.

The CI pipeline includes steps for:

- Checking out the code
- Setting up Python
- Installing dependencies
- Running unit tests
- Deploying the API to Fly.io
- Deploying the UI to Vercel

For more details, refer to the:

- [continuous-integration.yml](.github/workflows/continuous-integration.yml)
- [fly-deploy.yml](.github/workflows/fly-deploy.yml)
- [vercel-deploy.yml](.github/workflows/vercel-deploy.yml)
