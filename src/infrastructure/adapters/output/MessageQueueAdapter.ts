import { RabbitmqConnection } from "shared-lib";
import { IMessageQueue } from "../../../domain/interfaces/IMessageQueue";
import { DPOMessage } from "../../dpo/Message";

export class MessageQueueAdapter implements IMessageQueue {
    constructor(private readonly rabbit: RabbitmqConnection) {}

    async sendForValidation(message: DPOMessage): Promise<{ valid: boolean; userId: string; }> {
        this.rabbit.publishMessage(message, 'logs_exchange', 'chat-service.userID.new-message-validator');

        return new Promise(resolve => {
            setTimeout(() => {
                resolve({valid: true, userId: '1234'})
            }, 200)
        })
    }
    async sendViaWebSocket(userId: string, message: DPOMessage): Promise<void> {
        // publica mensagem via websocket 
    }

}