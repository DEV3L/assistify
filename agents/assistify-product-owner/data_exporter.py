from ai_assistant_manager.exporters.directory.directory_exporter import DirectoryExporter
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter


def export_data():
    DirectoryExporter("Assistify Status Trello Board").export()
    FilesExporter("Assistify Product Definition.txt").export()
    FilesExporter("Assistify Product Owner README.txt").export()
    # code
    FilesExporter("assistify-api.txt", directory="files/code").export()
    FilesExporter("assistify-ui.txt", directory="files/code").export()
