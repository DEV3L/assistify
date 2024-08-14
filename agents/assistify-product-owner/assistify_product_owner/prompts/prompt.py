from datetime import datetime

from ai_assistant_manager.encoding import UTF_8

PROMPT_PATH = "assistify_product_owner/prompts/prompt.md"

CURRENT_DATE_VARIABLE = "{{CURRENT_DATE}}"


def get_prompt(*, prompt_path: str = PROMPT_PATH):
    with open(prompt_path, "r", encoding=UTF_8) as prompt:
        current_date = datetime.today().date().isoformat()
        return prompt.read().replace(CURRENT_DATE_VARIABLE, current_date)
