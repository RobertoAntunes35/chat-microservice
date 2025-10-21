import { Message } from "../../entities/MessageEntitie";
import { ICommomRepository } from "./ICommomRepository";

export interface IMessageRepository extends ICommomRepository<Message>{
    findBySenderId(senderId: string): Promise<Message[]>;
    findByRepliesTo(messageId: string): Promise<Message[]>;
    findByConversation(conversationId: string): Promise<Message[]>;
    findAllByStatus(status: string): Promise<Message[]>;
}