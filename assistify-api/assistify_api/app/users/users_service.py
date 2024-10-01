from fastapi import Depends, HTTPException

from assistify_api.database.dao.assistants_dao import AssistantsDao
from assistify_api.database.dao.threads_dao import ThreadsDao
from assistify_api.database.dao.users_dao import UsersDao
from assistify_api.database.models.assistant import Assistant
from assistify_api.database.models.message import Message
from assistify_api.database.models.thread import Thread
from assistify_api.database.models.user import User

from .users_response import (
    UserAssistant,
    UserMessage,
    UserResponse,
    UsersResponse,
    UserThread,
)


class UsersService:
    def __init__(
        self,
        assistants_dao: AssistantsDao = Depends(AssistantsDao),
        threads_dao: ThreadsDao = Depends(ThreadsDao),
        users_dao: UsersDao = Depends(UsersDao),
    ):
        self.assistants_dao = assistants_dao
        self.threads_dao = threads_dao
        self.users_dao = users_dao

    def get_users(self) -> UsersResponse:
        users = self.users_dao.find_all(model_class=User)
        assistants = [
            self._build_user_assistant(assistant) for assistant in self.assistants_dao.find_all(model_class=Assistant)
        ]
        threads = [self._build_user_thread(thread) for thread in self.threads_dao.find_all(model_class=Thread)]

        users_response = UsersResponse(
            users=[
                self._build_user(
                    user,
                    [assistant for assistant in assistants if assistant.id in user.assistant_ids],
                    [thread for thread in threads if thread.id in user.thread_ids],
                )
                for user in users
            ]
        )
        return users_response

    def get_user(self, user_id: str) -> UserResponse:
        users_found = [user for user in self.get_users().users if user.id == user_id]

        try:
            return users_found[0]
        except IndexError:
            raise HTTPException(status_code=404, detail="User not found")

    def _build_user(self, user: User, assistants: list[UserAssistant], threads: list[UserThread]) -> UserResponse:
        return UserResponse(
            id=str(user.id),
            created=user.created,
            email=user.email,
            image=user.image,
            name=user.name,
            assistants=assistants,
            threads=threads,
            token_count=user.token_count,
        )

    def _build_user_assistant(self, assistant: Assistant) -> UserAssistant:
        return UserAssistant(
            id=str(assistant.id),
            image=assistant.image,
            model=assistant.model,
            name=assistant.name,
            provider=assistant.provider,
            status=assistant.status,
            summary_full=assistant.summary_full,
            summary_short=assistant.summary_short,
            token_count=assistant.token_count,
        )

    def _build_user_thread(self, thread: Thread) -> UserThread:
        return UserThread(
            id=str(thread.id),
            assistant_name=thread.assistant_name,
            model=thread.model,
            provider_thread_id=thread.provider_thread_id,
            provider=thread.provider,
            summary=thread.summary,
            messages=[self._build_user_message(message) for message in thread.messages],
            token_count=thread.token_count,
        )

    def _build_user_message(self, message: Message) -> UserMessage:
        return UserMessage(
            message=message.message,
            role=message.role,
            status=message.status,
            token_count=message.token_count,
        )
