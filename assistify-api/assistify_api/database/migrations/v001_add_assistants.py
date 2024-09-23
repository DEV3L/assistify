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

    assistify_concierge = Assistant(
        assistant_id="asst_0sd6SgqvyDhwZW8wuwdoHFQb",
        image="https://i.postimg.cc/mzqtZLk8/assistify-concierge.png",
        model=model_gpt_4o_mini,
        name=assistify_concierge_name,
        status="Public",
        summary_full=assistify_concierge_summary_full,
        summary_short=assistify_concierge_summary_short,
    )

    assistify_product_owner = Assistant(
        assistant_id="asst_8gUldikcrGKYjJLCIjWhXVZB",
        image="https://i.postimg.cc/gLZrnC6d/assistify-product-owner.png",
        model=model_gpt_4o_20240806,
        name=assistify_product_owner_name,
        status="Public",
        summary_full=assistify_product_owner_summary_full,
        summary_short=assistify_product_owner_summary_short,
    )

    ai_concept_to_code = Assistant(
        assistant_id="asst_KIGt5uXXYZp28kwkRxRLxIsl",
        image="https://i.postimg.cc/tZ7sHZqs/ai-concept-to-code.png",
        model=model_gpt_4o_20240806,
        name=ai_concept_to_code_name,
        status="Public",
        summary_full=ai_concept_to_code_summary_full,
        summary_short=ai_concept_to_code_summary_short,
    )

    dev3loper_ai_youtube_assistant_ = Assistant(
        assistant_id="asst_29rJwJjIxpZELERRoliLsD6j",
        image="https://i.postimg.cc/BtLjYK7y/dev3loper-ai-youtube-assistant.png",
        model=model_gpt_4o_20240806,
        name=dev3loper_ai_youtube_assistant_name,
        status="Public",
        summary_full=dev3loper_ai_youtube_assistant_summary_full,
        summary_short=dev3loper_ai_youtube_assistant_summary_short,
    )

    assistants_dao = AssistantsDao(db)
    assistants_dao.upsert(assistify_concierge)
    assistants_dao.upsert(assistify_product_owner)
    assistants_dao.upsert(ai_concept_to_code)
    assistants_dao.upsert(dev3loper_ai_youtube_assistant_)


model_gpt_4o_20240806 = "gpt-4o-2024-08-06"
model_gpt_4o_mini = "gpt-4o-mini"


assistify_concierge_name = "Assistify - Concierge"
assistify_concierge_summary_short = "Your friendly virtual guide to Assistify, helping you connect with specialized AI assistants to enhance and streamline your professional workflows."
assistify_concierge_summary_full = f"""
**{assistify_concierge_name}:** {assistify_concierge_summary_short}

---

Assistify - Concierge is your expert companion on the Assistify platform, dedicated to providing personalized support and guidance. With a deep understanding of Assistify's features and user journeys, this virtual concierge helps you seamlessly connect with specialized AI assistants in programming, product management, and content creation.

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

assistify_product_owner_name = "Assistify - Product Owner"
assistify_product_owner_summary_short = "Your expert guide to agile product development, assisting you in refining product vision, gathering requirements, and ensuring your projects exceed user expectations through effective strategies and user stories."
assistify_product_owner_summary_full = f"""
**{assistify_product_owner_name}:** {assistify_product_owner_summary_short}

---

**Detailed Summary:**

**Overview:**

Assistify - Product Owner is your virtual Head of Product on the Assistify platform, specializing in agile methodologies and extreme programming practices. With deep expertise in the software development lifecycle and product development processes, this assistant helps you define clear product visions and strategies that align with your objectives and market opportunities.

**How Assistify - Product Owner Can Help You:**

- **Product Vision and Strategy:** Assists in defining and refining your product's vision to align with company goals and market demands.
- **Requirement Gathering:** Helps prioritize product requirements and conduct user research to ensure your product meets user needs.
- **Agile User Stories:** Guides you in writing effective, concise user stories that adhere to agile principles and INVEST guidelines.
- **Development Oversight:** Offers insights on overseeing development processes to maintain high-quality standards and seamless user experiences.
- **Problem-Solving:** Provides accurate, reliable answers based on current product definitions and project statuses, informing you when data is unavailable and recommending actions to find necessary information.

**Example Questions You Might Ask:**

- "How can I define a clear product vision for my AI application?"
- "Can you help me write agile user stories for a new feature?"
- "What is the best way to prioritize product requirements based on user feedback?"
- "How do I ensure my development team adheres to extreme programming methodologies?"
- "Can you guide me through the process of conducting effective user research?"

**Communication Style:**

The assistant communicates in a conversational and engaging manner, balancing simplicity and depth—much like chatting with a knowledgeable friend. The focus is on innovative empowerment through:

- **Concise Insights:** Delivering impactful information without unnecessary introductions or complexity.
- **Smooth Flow:** Structuring content to flow naturally, making it easy to follow.
- **Clarity and Directness:** Using simple, insightful language while avoiding jargon and artificial terms.
- **Engaging Tone:** Maintaining a relaxed, natural cadence that mirrors speech patterns for a positive user experience.
- **Actionable Advice:** Providing steps and guidance that you can readily apply to your product development processes.

Assistify - Product Owner is dedicated to helping you drive your projects to success, ensuring that your products not only meet but exceed user expectations by aligning with agile principles and effective product management strategies.
"""


ai_concept_to_code_name = "AI Concept To Code Presenter"
ai_concept_to_code_summary_short = "Your expert guide to integrating AI and Large Language Models (LLMs) into agile software development, helping you revolutionize your practices from concept to code."
ai_concept_to_code_summary_full = f"""
**{ai_concept_to_code_name}:** {assistify_product_owner_summary_short}

---

**Detailed Summary:**

**Overview:**

The AI Concept To Code Presenter is your specialist in artificial intelligence, software engineering, and agile methodologies, particularly Extreme Programming (XP). With a deep understanding of integrating AI, especially LLMs like ChatGPT and GitHub Copilot, into every phase of the software development lifecycle, this assistant helps you transform your development processes to enhance productivity and innovation.

**How the AI Concept To Code Presenter Can Help You:**

- **Integrate AI into Agile Workflows:** Guides you on leveraging LLMs across planning, execution, testing, and deployment to optimize agile practices.
- **Enhance Extreme Programming (XP):** Offers insights on enriching XP practices like pair programming, test-driven development, and continuous integration with AI capabilities.
- **Strategic Planning with AI:** Assists in using AI for market analysis, strategic insights, and refining product strategies over various planning horizons.
- **Agile Adjustments:** Helps incorporate AI for real-time insights and data-driven decisions during sprint planning and task prioritization.
- **Execution Support:** Provides guidance on utilizing LLMs for coding assistance, real-time feedback, and automating documentation.

**Example Questions You Might Ask:**

- "How can I integrate LLMs like ChatGPT into my agile development workflow?"
- "What strategies can I use to enhance pair programming with AI tools?"
- "Can you explain the VISION, ADAPT, and LEAP frameworks for leveraging AI?"
- "How does 'AI Concept to Code' improve software development efficiency?"
- "What are practical ways to use AI in extreme programming practices?"

**Communication Style:**

The assistant communicates in a conversational and engaging manner, much like chatting with a knowledgeable friend. The focus is on innovative empowerment through:

- **Concise Insights:** Delivering impactful information without unnecessary introductions.
- **Smooth Flow:** Structuring content naturally, making it easy to follow.
- **Clarity and Directness:** Using simple, insightful language while avoiding jargon.
- **Engaging Tone:** Maintaining a relaxed, natural cadence that mirrors speech patterns.
- **Actionable Advice:** Providing steps and guidance that you can readily apply to your development processes.

The AI Concept To Code Presenter is dedicated to helping you embrace the future of agile development by leveraging AI and LLMs to achieve superior product quality and team productivity.
"""


dev3loper_ai_youtube_assistant_name = "Dev3loper.ai YouTube Assistant"
dev3loper_ai_youtube_assistant_summary_short = "Your expert guide to crafting engaging YouTube video descriptions, metadata, and social media posts tailored for software developers interested in AI and generative AI."
dev3loper_ai_youtube_assistant_summary_full = f"""
**{dev3loper_ai_youtube_assistant_name}:** {dev3loper_ai_youtube_assistant_summary_short}

---

**Detailed Summary:**

**Overview:**

The Dev3loper.ai YouTube Assistant is your specialist in creating compelling YouTube content that resonates with the software development community, especially those intrigued by AI and generative AI. With expertise in crafting engaging video descriptions, optimizing metadata for SEO, and enhancing audience engagement, this assistant helps you maximize your video's reach and impact.

**How the Dev3loper.ai YouTube Assistant Can Help You:**

- **Engaging Video Descriptions:** Crafts detailed and captivating descriptions based on your video title, transcript, and notes.
- **Metadata Optimization:** Provides SEO-optimized metadata, including relevant tags and keywords, to improve your video's discoverability.
- **Pinned Comments:** Suggests insightful comments to pin, encouraging viewer interaction and engagement.
- **Social Media Promotion:** Generates engaging posts for Twitter and LinkedIn to announce and promote your video effectively.
- **YouTube Thumbnail Guidance:** Offers image descriptions suitable for creating eye-catching thumbnails using tools like Midjourney.

**Example Questions You Might Ask:**

- "Can you help me write an engaging description for my new video on AI-XP?"
- "What tags should I use for a video about leveraging ChatGPT in software development?"
- "Could you draft a pinned comment that encourages viewers to share their thoughts?"
- "How can I optimize my video metadata for better SEO targeting AI engineers?"
- "Can you create social media posts to promote my latest tutorial on using LLMs?"

**Communication Style:**

The assistant communicates in a conversational and engaging manner, resembling a chat with a knowledgeable friend. The focus is on innovative empowerment through:

- **Concise Insights:** Delivering impactful information without unnecessary introductions.
- **Smooth Flow:** Structuring content naturally to ensure easy comprehension.
- **Clarity and Directness:** Using simple, insightful language while avoiding jargon and complexity.
- **Engaging Tone:** Maintaining a relaxed, natural cadence that mirrors thoughtful speech patterns.
- **Actionable Advice:** Providing practical steps and guidance that you can readily apply to enhance your YouTube content.
"""
