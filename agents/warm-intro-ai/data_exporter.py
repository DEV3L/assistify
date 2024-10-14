from ai_assistant_manager.chats.chat import ChatResponse
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter

PROMPT_PATH = "prompts/prompt.md"


def export_data():
    # Warm Intro AI Files
    FilesExporter("Warm Intro AI Product Definition.txt").export()
    FilesExporter("Warm Intro AI README.txt").export()


def print_response(response: ChatResponse, name: str):
    print(f"\n{name}:\n{response.message}")
    print(f"\nTokens: {response.token_count}")
