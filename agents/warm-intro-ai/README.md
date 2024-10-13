# Warm Intro AI

> Automated AI Outreach for Busy Professionals.

**Warm Intro AI** automates the creation of personalized outreach messages for busy professionals like consultants and entrepreneurs. Leveraging AI to analyze various personal and professional data, it helps craft messages that resonate, fostering valuable connections and potential collaborations through a client-centered approach.

[OpenAI Assistants API Beta](https://platform.openai.com/docs/assistants/overview)

---

## Introduction

### About OpenAI Assistants

OpenAI Assistants are AI models tailored to perform specific tasks or functions, enhancing user experiences across various domains. They utilize advanced language understanding and generation capabilities to assist with tasks such as content creation, customer engagement, personalized communication, and more.

By leveraging the power of OpenAI's language models, Assistants can understand context, engage in meaningful conversations, and perform tasks that traditionally require human intelligence.

### About Warm Intro AI

**Warm Intro AI** is an innovative AI-driven assistant aimed at revolutionizing professional connections for busy professionals. By automating the personalization of outreach messages, it enables users to engage effectively with potential clients through context-rich communications drawn from sources like LinkedIn profiles, conference bios, and CRM data.

**Key Features:**

- **AI-driven Personalized Outreach Messages:** Automate the creation of tailored messages that resonate with potential clients.
- **Integration with CRM Platforms:** Seamlessly integrate with your existing CRM to manage contacts and track interactions.
- **Context Analysis:** Analyze personal and professional data such as LinkedIn profiles, conference bios, and past interactions.
- **User-friendly Interface:** Designed for busy professionals to save time and enhance business development capabilities.
- **Client-centered Communication Strategies:** Emphasize genuine engagement with decision-makers through authenticity and effectiveness.
- **Future Capabilities:** Potential for voice message integration using platforms like OpenAI’s streaming voice.

**Purpose:**

Warm Intro AI assists users in developing outreach communications that align with consultative selling approaches, enhancing the likelihood of building meaningful professional relationships and successfully engaging potential clients.

---

## Assistant Description

### Warm Intro AI

**Warm Intro AI** is dedicated to assisting busy professionals in automating the creation of personalized outreach messages, enabling them to connect effectively with potential clients and build meaningful professional relationships.

#### Persona

Warm Intro AI is a cutting-edge AI assistant that empowers professionals like consultants, entrepreneurs, business development representatives, and customer relationship managers. With advanced AI capabilities, it analyzes various data sources to craft messages that are authentic, relevant, and effective.

**Characteristics:**

- **Efficient and Reliable:** Provides quick and accurate message suggestions to save users time.
- **Insightful and Context-Aware:** Leverages data analysis to deeply understand the client's background.
- **Client-Centered:** Focuses on the client's needs and how the user can provide value.
- **Professional and Approachable:** Maintains a tone that is both professional and engaging.

#### Tone and Voice

- **Warm and Professional:** Communicates in a manner that is friendly yet respectful of professional boundaries.
- **Empathetic Empowerment:** Encourages and supports the user in building effective connections.
- **Clear and Concise:** Provides messages that are easy to understand and get straight to the point.
- **Authentic and Personalized:** Ensures that each message feels tailor-made for the recipient, avoiding generic language.
- **Positive and Engaging:** Uses an optimistic tone that invites further conversation.

---

## Key Features

- **AI-driven Personalized Outreach Messages**
- **Integration with CRM Platforms**
- **Context Analysis from LinkedIn, Conference Bios, and More**
- **User-friendly Interface for Busy Professionals**
- **Emphasizes Client-centered Communication Strategies**
- **Potential Future Voice Message Capabilities**

---

## Technology

Warm Intro AI leverages advanced Natural Language Processing (NLP) and Machine Learning (ML) technologies to personalize professional outreach. The assistant integrates with CRM tools to automate workflows and data management, utilizing robust ML frameworks such as TensorFlow or PyTorch, supported by reliable cloud services like AWS or Azure for scalability and performance.

---

## Users

**Warm Intro AI** is designed for:

- **Business Development Representatives**

  Responsible for identifying new business opportunities and nurturing leads. Warm Intro AI helps them by automating personalized messages to potential clients, allowing them to focus on strategic engagement.

- **Customer Relationship Managers**

  Maintain and enhance client relationships within organizations. Warm Intro AI aids them by automating personalized outreach, integrating seamlessly with existing workflows, and enhancing client interaction quality.

- **Entrepreneurs**

  Dynamic individuals who drive business growth and innovation. Warm Intro AI provides the capability to automate personalized outreach, helping entrepreneurs save time and focus on scaling their ventures.

- **Professional Consultants**

  Expert advisors who provide strategic solutions across various industries. Warm Intro AI empowers them by automating personalized outreach, optimizing client acquisition, and integrating seamlessly into their workflows.

---

## Additional Information

### Principles from "How Clients Buy"

Warm Intro AI aligns with the principles from _"How Clients Buy"_, focusing on:

- **Building Trust Before Selling:** Establishing genuine connections without pushing a sales agenda.
- **Understanding Client Needs:** Emphasizing the importance of understanding the client's world before offering solutions.
- **Providing Value Upfront:** Offering assistance and insights without expecting immediate business.
- **Avoiding Aggressive Selling Tactics:** Focusing on being a helpful resource rather than pushing for a sale.
- **Fostering Authentic Connections:** Building relationships based on authenticity and mutual respect.

---

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/DEV3L/assistify
cd ./assistify/agents/warm-intro-ai
```

### 2. Configure Environment Variables

Copy the `env.default` file to a new file named `.env` and replace the placeholder environment variables:

```bash
cp env.default .env
```

#### Environment Variables

Configure the following variables in your `.env` file:

##### Required

- `OPENAI_API_KEY`: Your OpenAI API key.

##### OpenAI

- `OPENAI_API_KEY`: Your OpenAI API key.

##### Project

- `ASSISTANT_DESCRIPTION`: Warm Intro AI - Automated AI Outreach for Busy Professionals.
- `ASSISTANT_NAME`: Warm Intro AI.
- `DATA_FILE_PREFIX`: warm-intro-ai.

### 3. Setup a Virtual Environment

Install `hatch` if you haven't already:

```bash
brew install hatch
```

Create and activate the virtual environment:

```bash
hatch env create
hatch shell
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

---

## Usage

### Start a Chat with Warm Intro AI

Use the `run_chat.py` script to interact with Warm Intro AI:

```bash
hatch run chat
```

This script will:

1. Load or create a new assistant.
2. Start a chat thread with the assistant.
3. Read input from the command line.

### End-to-End Interaction

Use the `run_end_to_end.py` script for an end-to-end test:

```bash
hatch run e2e
```

This script will:

1. Create a new assistant.
2. Send a message to the assistant.
3. Remove the assistant.

---

## Testing

### End-to-End Test

Run the following command to perform an end-to-end test of Warm Intro AI:

```bash
hatch run e2e
```

### Unit Tests

Execute unit tests to ensure everything is working correctly:

```bash
hatch run test
```

### Coverage Gutters

To visualize code coverage in your editor:

```bash
Command + Shift + P => Coverage Gutters: Watch
```

---

Happy connecting with WarmIntroAI!
