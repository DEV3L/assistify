from ai_assistant_manager.chats.chat import ChatResponse
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter

PROMPT_PATH = "prompts/prompt.md"

warm_intro_ai_files = [
    "Warm Intro AI Product Definition.txt",
    "Warm Intro AI README.txt",
]

# dev3loper_ai_files = [
#     "AI and the Modern Developer.txt",
#     "AI Concept to Code - Lean Agile Scotland 2024.txt",
#     "AI Concept to Code.txt",
#     "AI Powered Product Development: From User Story to Deployment.txt",
#     "AI-XP Unpacked - Integrating AI with Extreme Programming for Enhanced Agility.txt",
#     "AI-XP.txt",
#     "Assistify.txt",
#     "Dev3loper AI.txt",
#     "Dev3loper on Co-Intelligence.txt",
#     "Dev3loper-AI Website Summary.txt",
#     "Dev3loper-AI Website.txt",
#     "Harnessing OpenAI Assistants for Dynamic Content Generation.txt",
#     "Intelligent Engineering with AI.txt",
#     "justin_beall_resume.txt",
#     "linkedin_profile.txt",
# ]


def export_data():
    [FilesExporter(file).export() for file in warm_intro_ai_files]
    # [FilesExporter(file, directory=".secret/Dev3loper-AI").export() for file in dev3loper_ai_files]


def print_response(response: ChatResponse, name: str):
    print(f"\n{name}:\n{response.message}")
    print(f"\nTokens: {response.token_count}")
