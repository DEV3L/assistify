from assistify_api.database.models.assistant import Assistant
from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import User

from .users_service import UsersService

user_id = "abc"
assistant = Assistant(
    assistant_id="def",
    model="gpt-4o-mini",
    name="test assistant",
)
assistant.id = "def"

thread = Thread(
    user_id=user_id,
    assistant_id=assistant.id,
    assistant_name=assistant.name,
    model=assistant.model,
    provider=assistant.provider,
    provider_thread_id="xyz",
    token_count=100,
)
thread.id = "qrs"

user = User(
    email="test@test.com",
    image="",
    name="test",
    assistant_ids=[assistant.id],
    thread_ids=[thread.id],
    token_count=100,
)
user.id = user_id


def test_get_assistants(users_service: UsersService):
    users_service.users_dao.find_all.return_value = [user]
    users_service.assistants_dao.find_all.return_value = [assistant]
    users_service.threads_dao.find_all.return_value = [thread]

    users_response = users_service.get_users()

    assert users_response.users[0].id == user.id
    assert users_response.users[0].assistants[0].id == assistant.id
    assert users_response.users[0].threads[0].id == thread.id


def test_get_assistant(users_service: UsersService):
    users_service.users_dao.find_all.return_value = [user]
    users_service.assistants_dao.find_all.return_value = [assistant]
    users_service.threads_dao.find_all.return_value = [thread]

    user_response = users_service.get_user(user_id)

    assert user_response.id == user.id
    assert user_response.assistants[0].id == assistant.id
    assert user_response.threads[0].id == thread.id
