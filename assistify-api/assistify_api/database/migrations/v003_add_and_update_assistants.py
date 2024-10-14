import os

from ai_assistant_manager.clients.openai_api import OpenAIClient, build_openai_client
from ai_assistant_manager.env_variables import set_env_variables
from loguru import logger

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.mongodb import MongoDb
from assistify_api.database.version_control_wrapper import version_control

version = os.path.splitext(os.path.basename(__file__))[0]


@version_control(version)
def run(db: MongoDb, *_):
    logger.info(f"Running migration {version}")

    set_env_variables()
    client = OpenAIClient(build_openai_client())
    assistants_dao = AssistantsDao(db)

    warm_intro_ai = Assistant(
        assistant_id="asst_JoD885v4TVa4w3feW2GrPh9l",
        image="https://i.postimg.cc/YCNNXyzv/Warm-Intro-AI-Avatar.png",
        model=model_gpt_4o_20240806,
        name=warm_intro_ai_name,
        status="Public",
        summary_full=warm_intro_ai_summary_full,
        summary_short=warm_intro_ai_summary_short,
    )

    warm_intro_ai_artium = Assistant(
        assistant_id="asst_Eo2g4EMFFFegzQ0plMyN5hVh",
        image="https://i.postimg.cc/SNK1X9CX/Warm-Intro-AI-Artium-Avatar.png",
        model=model_gpt_4o_20240806,
        name="Warm Intro AI (Artium)",
        status="Private",
        summary_full=warm_intro_ai_summary_full,
        summary_short=warm_intro_ai_summary_short,
    )

    assistants_dao.upsert(warm_intro_ai)
    assistants_dao.upsert(warm_intro_ai_artium)

    openai_assistants = [assistant for assistant in client.assistants_list() if assistant.name]

    db_assistants = assistants_dao.find_all(model_class=Assistant)

    assistants_to_be_updated = [
        (db_assistant, openai_assistant)
        for db_assistant in db_assistants
        for openai_assistant in openai_assistants
        if db_assistant.name == openai_assistant.name and db_assistant.assistant_id != openai_assistant.id
    ]

    for db_assistant, openai_assistant in assistants_to_be_updated:
        db_assistant.assistant_id = openai_assistant.id
        assistants_dao.upsert(db_assistant)

    logger.info(f"Migration {version} completed successfully")


model_gpt_4o_20240806 = "gpt-4o-2024-08-06"


warm_intro_ai_name = "Warm Intro AI"
warm_intro_ai_summary_short = "Warm Intro AI assists users in developing outreach communications that align with consultative selling approaches, enhancing the likelihood of building lasting professional relationships and successfully engaging potential clients."
warm_intro_ai_summary_full = f"""
**{warm_intro_ai_name}:** {warm_intro_ai_summary_short}

---

**Warm Intro AI** is your expert companion for crafting personalized outreach messages, dedicated to helping busy professionals like you build meaningful connections with potential clients. With a deep understanding of relationship-based selling principles and advanced AI capabilities, this virtual assistant automates the creation of tailored messages that resonate with your target audience.

**How Warm Intro AI Can Help You:**

- **Personalized Message Crafting:** Initiates conversations to understand your unique background and goals, crafting messages that align with your objectives and the interests of your potential clients.
- **Data Analysis:** Utilizes information from sources like LinkedIn profiles, conference bios, and CRM data to enrich your messages with relevant context.
- **Efficiency Enhancement:** Saves you time by automating the personalization process, allowing you to focus on other important aspects of your professional life.
- **Relationship Building Support:** Offers insights and suggestions to foster genuine connections, helping you engage decision-makers with authenticity and effectiveness.

**Example Actions You Might Take:**

- Provide your professional background and unique value proposition to personalize your outreach messages.
- Input information about potential clients, such as their professional achievements or recent projects.
- Ask for assistance in crafting a message that highlights common interests or potential collaboration opportunities.
- Request tips on how to follow up with a client after the initial outreach.

**Communication Style:**

Warm Intro AI communicates in a warm, professional, and engaging manner—like collaborating with a trusted colleague. The focus is on providing empathetic empowerment through:

- **Clear Guidance:** Delivering straightforward message drafts without unnecessary jargon.
- **Relatable Language:** Using simple terms to ensure clarity and resonance with your clients.
- **Conversational Tone:** Keeping interactions relaxed and natural to make the process seamless and enjoyable.
- **Actionable Advice:** Offering insights and steps that you can easily implement to enhance your outreach efforts.

Warm Intro AI is here to streamline your professional interactions, ensuring you create impactful connections that drive business success—all while saving you valuable time.
"""
