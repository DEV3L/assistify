# Assistify Agents

Welcome to the **Assistify Agents** repository! This directory contains specialized AI assistants designed to provide tailored support in various domains. The agents are built using the [ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager) project to manage the assistant's lifecycle, interactions, and configurations.

## Table of Contents

- [Assistify Agents](#assistify-agents)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Agent Structure](#agent-structure)
  - [Available Agents](#available-agents)
    - [Assistify Concierge](#assistify-concierge)
    - [Assistify Product Owner](#assistify-product-owner)
    - [Warm Intro AI](#warm-intro-ai)
  - [Building a New Agent](#building-a-new-agent)
  - [Open Source Libraries](#open-source-libraries)
  - [License](#license)
  - [Contact](#contact)
  - [Additional Note](#additional-note)

## Overview

Each agent in this repository is designed with specific prompts, data, and intentions to serve distinct roles. The agents leverage several open-source libraries to enhance their capabilities:

- **[ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager)**: Manages the agent's configuration, interactions, and lifecycle.
- **[ai-code-summary](https://github.com/DEV3L/ai-code-summary)**: Summarizes codebases to provide context and knowledge to the agents.
- **[ai-trello-extract](https://github.com/DEV3L/ai-trello-extract)**: Integrates with Trello to extract board data for agents that require project management insights.

## Agent Structure

Each agent follows a common structure:

- **`data/`**: Stores data files used by the agent (e.g., code summaries, Trello data).
- **`prompts/`**: Includes the agent's prompt files.
- **`integration/`**: Contains integration tests for the agent.
- **`run_chat.py`**: Script to interact with the agent via the command line.
- **`run_end_to_end.py`**: Script for end-to-end testing.

## Available Agents

### Assistify Concierge

- **Purpose**: Acts as a friendly and knowledgeable assistant to help users navigate and utilize Assistify effectively.
- **Data Sources**: Trello board data, code summaries.
- **Intention**: Provide guidance, answer questions, and enhance user experience within the Assistify platform.
- **[More Details](assistify-concierge/README.md)**

### Assistify Product Owner

- **Purpose**: Provides insights into product management aspects, offering technical details and updates about the Assistify project.
- **Data Sources**: Trello boards, code summaries from Assistify API and UI.
- **Intention**: Assist in product planning, backlog management, and offer strategic insights.
- **[More Details](assistify-product-owner/README.md)**

### Warm Intro AI

- **Purpose**: Automates the creation of personalized outreach messages for busy professionals.
- **Data Sources**: Personal and professional data analysis (e.g., LinkedIn profiles, conference bios).
- **Intention**: Help users craft messages that resonate, fostering valuable connections and potential collaborations.
- **[More Details](warm-intro-ai/README.md)**

## Building a New Agent

To build a new agent, you can follow these steps:

1. **Copy an Existing Agent**: Choose an existing agent (e.g., `assistify-concierge`) and copy its directory.

   ```bash
   cp -r assistify-concierge new-agent-name
   ```

2. **Update Properties**: Modify the configuration files, prompts, and data to suit your new agent's purpose.

   - Update `env.default` with the new agent's name, description, and settings.
   - Edit prompts in the `prompts/` directory.
   - Replace or add data files in the `data/` directory.

3. **Install Dependencies**: Navigate to your new agent's directory and set up the environment.

   ```bash
   cd new-agent-name
   hatch env create
   ```

4. **Build the Agent**: Use the provided scripts to build and test your agent.

   ```bash
   hatch run build
   ```

5. **Add to Migrations**: To include your new agent in the application, add it to a migration script in the `assistify-api` repository. This ensures the agent appears in the app upon startup.

6. **Test Your Agent**: Run unit and integration tests to verify your agent behaves as expected.

## Open Source Libraries

The agents leverage several open-source libraries, all created by Justin Beall (https://github.com/DEV3L):

- **[ai-assistant-manager](https://github.com/DEV3L/ai-assistant-manager)**: Manages AI assistant configurations and interactions.
  - **PyPI**: https://pypi.org/project/ai-assistant-manager/
- **[ai-code-summary](https://github.com/DEV3L/ai-code-summary)**: Summarizes codebases to provide context to AI assistants.
  - **PyPI**: https://pypi.org/project/ai-code-summary/
- **[ai-trello-extract](https://github.com/DEV3L/ai-trello-extract)**: Extracts data from Trello boards for AI assistants.
  - **PyPI**: https://pypi.org/project/ai-trello-extract/

By using these libraries, the agents can be more powerful and context-aware.

## License

This project is licensed under the **MIT License** - see the [LICENSE](../LICENSE) file for details.

## Contact

Assistify is developed by Justin Beall of **Dev3loper.ai**.

- **Website**: [dev3loper.ai](https://www.dev3loper.ai)

---

Ready to enhance your productivity with AI? Explore our specialized agents and see how they can assist you today!

## Additional Note

All these agents are available when logging into the Assistify interface. Explore each agent to experience their unique capabilities tailored to enhance your professional workflows.

---

Thank you for exploring the Assistify Agents!
