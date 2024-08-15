from ai_assistant_manager.chats.chat import Chat


class ChatService:
    """
    Service to handle chat interactions with OpenAI API.

    Attributes:
        api_client: The OpenAI API client.
    """

    def __init__(self, chat: Chat):
        """
        Initializes the ChatService with an Chat.

        Args:
            chat: The ai_assistant_manager chat instance.
        """
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
