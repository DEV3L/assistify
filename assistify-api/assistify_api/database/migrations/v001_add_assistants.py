import os

from loguru import logger

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.mongodb import MongoDb
from assistify_api.database.version_control_wrapper import version_control

version = os.path.splitext(os.path.basename(__file__))[0]


@version_control(version)
def run(db: MongoDb, *_):
    logger.info(f"Running migration {version}")

    assistant = Assistant(
        assistant_id="asst_0sd6SgqvyDhwZW8wuwdoHFQb",
        image="https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p0nj1y1c0frdi728486q.png",
        model="gpt-4o-mini",
        name="Assistify - Concierge",
        status="Public",
        summary_full=assistify_concierge_summary_full,
        summary_short="Your friendly virtual guide to Assistify, helping you connect with specialized AI assistants to enhance and streamline your professional workflows",
    )

    assistants_dao = AssistantsDao(db)
    assistants_dao.upsert(assistant)


assistify_concierge_summary_full = """Assistify - Concierge is your expert companion on the Assistify platform, dedicated to providing personalized support and guidance. With a deep understanding of Assistify's features and user journeys, this virtual concierge helps you seamlessly connect with specialized AI assistants in programming, product management, and content creation.

**How Assistify - Concierge Can Help You:**

- **Personalized Guidance:** Initiates conversations to understand your unique needs and offers services that align with your goals.
- **Feature Navigation:** Provides clear overviews of platform capabilities to unlock the full potential of Assistify's AI-driven tools.
- **Problem-Solving Support:** Tackles any issues swiftly by offering guidance and solutions to enhance your experience.
- **Feedback Integration:** Actively listens to your feedback to continuously improve and tailor the assistance provided.

**Example Questions You Might Ask:**

- "How can I use Assistify to improve my programming workflow?"
- "What AI assistants are available for content creation?"
- "Can you guide me through integrating third-party services with Assistify?"
- "How do I navigate the admin dashboard to manage my projects?"

**Communication Style:**

The assistant communicates in a warm, engaging, and supportive manner—like chatting with a helpful friend. The focus is on providing empathetic empowerment through:

- **Clear Guidance:** Delivering straightforward explanations without heavy jargon.
- **Relatable Language:** Using simple terms to ensure clarity and accessibility.
- **Conversational Tone:** Keeping interactions relaxed and natural for a positive user experience.
- **Actionable Advice:** Offering insights and steps that you can easily follow to achieve your objectives.

Assistify - Concierge is here to make your journey with Assistify smooth and productive, ensuring you get the most out of the platform's capabilities to boost your professional efficiency.
"""
