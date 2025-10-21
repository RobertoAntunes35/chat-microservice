export interface ISocketGateway {
  sendMessageToConversation(conversationId: string, payload: any): Promise<void>;
  sendTypingEvent(conversationId: string, userId: string): Promise<void>;
}