from datetime import datetime

from assistify_product_owner.prompts.prompt import PROMPT_PATH, get_prompt


def test_get_prompt():
    current_date = datetime.today().date().isoformat()

    prompt = get_prompt(prompt_path=PROMPT_PATH)
    assert isinstance(prompt, str)
    assert current_date in prompt
