export interface ISocketGateway {
  emitToConversation(conversationId: string, event: string, payload: any): void;
  emitToUser(userId: string, event: string, payload: any): void;
}
