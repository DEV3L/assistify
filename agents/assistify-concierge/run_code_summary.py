import argparse

from ai_code_summary.markdown.export import create_markdown_from_code


def main(source_path: str) -> None:
    """
    Generate markdown documentation from the source code.

    Args:
        source_path (str): The path to the source code directory.
    """
    create_markdown_from_code(source_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate markdown documentation from the source code.")
    parser.add_argument(
        "source_path", nargs="?", default=".", help="The path to the source code directory (default: current directory)"
    )
    args = parser.parse_args()
    main(args.source_path)
