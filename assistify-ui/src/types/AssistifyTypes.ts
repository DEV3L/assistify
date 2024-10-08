import { components } from "./AssistifyApiTypes";

export type ListAssistantsResponse =
  components["schemas"]["ListAssistantsResponse"];
export type AssistantResponse = components["schemas"]["AssistantResponse"];

export type SendMessageResponse = components["schemas"]["SendMessageResponse"];

export type CreateThreadResponse = components["schemas"]["ThreadRequest"];
export type ThreadResponse = components["schemas"]["ThreadResponse"];

export type UserResponse = components["schemas"]["UserResponse"];
export type UserAssistant = components["schemas"]["UserAssistant"];
export type UserMessage = components["schemas"]["UserMessage"];
export type UserThread = components["schemas"]["UserThread"];
