from ai_assistant_manager.exporters.directory.directory_exporter import DirectoryExporter
from ai_assistant_manager.exporters.files.files_exporter import FilesExporter


def export_data():
    DirectoryExporter("entries").export()
    FilesExporter("assistify-product-owner-README.txt").export()
    # code
    FilesExporter("assistify-api.txt", directory="files/code").export()
    FilesExporter("assistify-ui.txt", directory="files/code").export()
