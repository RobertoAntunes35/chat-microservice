import { ISocketGateway } from "../../domain/interfaces/ISocketGateway";
import { SendMessageUseCase } from "../../application/usecase/message/SendMessageUseCase";
import { DPOMessage } from "../dpo/Message";
import {v4 as uuidv4} from 'uuid';
export class SocketGatewayImpl implements ISocketGateway {
  constructor(private readonly sendMessageUseCase: SendMessageUseCase) {}

  async sendMessageToConversation(conversationId: string, payload: DPOMessage): Promise<void> {

    // 1. aqui, estamos criando a mensagem, mas a mesma, sera o payload
    const message: DPOMessage = {
      message: {
        id: uuidv4(),
        content: 'Olá, tudo bom?',
        type: 'oi',
        replyTo: 123,
        isDeleted: false,
        createdAt: new Date(),
        conversationId: conversationId,
        senderId: 123,
        mediaUrl: ''
      }
    }

    // 
    await this.sendMessageUseCase.execute(message);
  }

  async sendTypingEvent(conversationId: string, userId: string): Promise<void> {
  }
}