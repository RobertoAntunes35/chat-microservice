import { IConversationParticipantsRepository } from "../../domain/interfaces/IEntities/IConversationParticipantsRepository";
import { IConversationRepository } from "../../domain/interfaces/IEntities/IConversationRepository";
import { IMessageQueue } from "../../domain/interfaces/IMessageQueue";
import { DPOMessage } from "../../infrastructure/dpo/Message";




export class ConversationService {
    constructor(
        private conversationRepository: IConversationRepository, 
        private conversationParticipants: IConversationParticipantsRepository,
        private readonly messageQueue: IMessageQueue) {};

    async validateMessage(message: DPOMessage): Promise<{valid: boolean; userId: string}> {
        const result = await this.messageQueue.sendForValidation(message)
        return result;
    }
}