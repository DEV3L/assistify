from ai_assistant_manager.chats.chat import ChatResponse
from ai_assistant_manager.exporters.directory.directory_exporter import DirectoryExporter
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter

PROMPT_PATH = "prompts/prompt.md"


def export_data():
    # Assistify Status Trello Board
    DirectoryExporter("Assistify Status Trello Board").export()
    # Assistify Files
    FilesExporter("Assistify Product Definition.txt").export()
    FilesExporter("Assistify Concierge README.txt").export()
    # code
    FilesExporter("ai-assistant-manager.txt", directory="files/code").export()
    FilesExporter("assistify-api.txt", directory="files/code").export()
    FilesExporter("assistify-concierge.txt", directory="files/code").export()
    FilesExporter("assistify-github-workflows.txt", directory="files/code").export()
    FilesExporter("assistify-ui.txt", directory="files/code").export()


def print_response(response: ChatResponse, name: str):
    print(f"\n{name}:\n{response.message}")
    print(f"\nTokens: {response.token_count}")
