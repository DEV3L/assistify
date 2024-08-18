from ai_assistant_manager.exporters.directory.directory_exporter import DirectoryExporter
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter


def export_data():
    # Assistify Status Trello Board
    DirectoryExporter("Assistify Status Trello Board").export()
    # Assistify Files
    FilesExporter("Assistify Product Definition.txt").export()
    FilesExporter("Assistify Product Owner README.txt").export()
    # code
    FilesExporter("assistify-api.txt", directory="files/code").export()
    FilesExporter("assistify-github-workflows.txt", directory="files/code").export()
    FilesExporter("assistify-product-owner.txt", directory="files/code").export()
    FilesExporter("assistify-ui.txt", directory="files/code").export()
