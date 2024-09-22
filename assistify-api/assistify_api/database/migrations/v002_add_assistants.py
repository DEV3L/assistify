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

    dev3loper_ai_youtube_assistant_ = Assistant(
        assistant_id="asst_29rJwJjIxpZELERRoliLsD6j",
        image="https://i.ibb.co/vhxgbTr/dev3loper-ai-youtube-assistant.png",
        model=model_gpt_4o_20240806,
        name=dev3loper_ai_youtube_assistant_name,
        status="Public",
        summary_full=dev3loper_ai_youtube_assistant_summary_full,
        summary_short=dev3loper_ai_youtube_assistant_summary_short,
    )

    assistants_dao = AssistantsDao(db)
    assistants_dao.upsert(dev3loper_ai_youtube_assistant_)


model_gpt_4o_20240806 = "gpt-4o-2024-08-06"


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
