from ai_assistant_manager.chats.chat import Chat


class ChatService:
    def __init__(self, chat: Chat):
        self.chat = chat

    def send_message(self, message: str, thread_id: str | None = None) -> str:
        """
        Sends a message to the assistant and returns the chat completion.

        Args:
            message: The message to send.
            thread_id: The optional thread ID for the conversation.

        Returns:
            The resulting chat completion.
        """
        self.chat.thread_id = thread_id if thread_id else self.chat.thread_id
        self.chat.start()
        return self.chat.send_user_message(message=message)

    def get_or_create_thread(self, user_id: str, thread_id: str) -> str:
        """
        Retrieves the existing thread for the user or creates a new one.
        """
        threads = self.chat.list_threads(user_id=user_id)
        if threads:
            return threads[0].id
        else:
            new_thread = self.chat.create_thread(user_id=user_id)
            self.send_message("Hello", thread_id=new_thread.id)
            return new_thread.id

    def get_messages(self, thread_id: str) -> list[str]:
        """
        Retrieves messages from the specified thread.
        """
        return self.chat.list_messages(thread_id=thread_id)
