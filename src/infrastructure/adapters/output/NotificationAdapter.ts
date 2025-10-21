import { Server } from "socket.io";
import { INotificationService } from "../../../domain/interfaces/INotificationService";
import { ISocketGateway } from "../../../domain/interfaces/ISocketGateway";
import { DPOMessage } from "../../dpo/Message";

export class NotificationAdapter implements INotificationService {
    constructor(private readonly io: Server) {}
    
    public async sendEventUser(userId: string, conversationId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public async sendByHttp(userId: string, message: DPOMessage): Promise<void> {
        console.log(`Enviando mensagem para ${userId} via HTTP/RabbitMQ`);
    }
    public async sendByWebsocket(conversationId: string, message: DPOMessage): Promise<void> {
        this.io.to(`conversation:${conversationId}`).emit("new-message", message);
    }

    
}