import { IStatusMessageRepository } from "../../domain/interfaces/IStatusMessageRepository";
import { StatusMessageService } from "../../domain/interfaces/StatusMessageService";


export class StatusMessageServiceImp implements StatusMessageService {
    
    constructor(private readonly statusMessageRepository: IStatusMessageRepository) {}
    
    async markAsDelivered(messageId: string, userId: string): Promise<void> {
        await this.statusMessageRepository.updateStatus(messageId, userId, 'DELIVERED')
    }
    async markAsRead(messageId: string, userId: string): Promise<void> {
        await this.statusMessageRepository.updateStatus(messageId, userId, 'READ')
    }
}