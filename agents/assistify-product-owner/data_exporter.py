from ai_assistant_manager.chats.chat import ChatResponse
from ai_assistant_manager.exporters.directory.directory_exporter import DirectoryExporter
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter

PROMPT_PATH = "prompts/prompt.md"

files = [
    # Assistify Files
    "Assistify Product Definition.txt"
    "Assistify Product Owner README.txt"
    # Assistify Release Information
    "Assistify Release.txt",
    "Assistify Release - Detailed.txt",
    "Assistify Release - Trello Status v0-0-1.txt",
]

code_files = [
    "ai-assistant-manager.txt",
    "assistify-api.txt",
    "assistify-github-workflows.txt",
    "assistify-product-owner.txt",
    "assistify-ui.txt",
]


def export_data():
    # Assistify Status Trello Board
    DirectoryExporter("Assistify Status Trello Board").export()

    [FilesExporter(file).export() for file in files]
    [FilesExporter(file, directory="files/code").export() for file in code_files]


def print_response(response: ChatResponse, name: str):
    print(f"\n{name}:\n{response.message}")
    print(f"\nTokens: {response.token_count}")
