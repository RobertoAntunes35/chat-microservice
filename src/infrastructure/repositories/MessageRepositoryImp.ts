import { BaseRepository } from "./base-repository";
import { MessageModel } from "../database/model/message-model";
import { Message } from "../../domain/entities/MessageEntitie";
import { IMessageRepository } from "../../domain/interfaces/IEntities/IMessageRepository";

const MessageMapper = {
  toEntity(model: MessageModel): Message {
    return new Message(
      model.id,
      model.content,
      model.mediaUrl,
      model.type,
      model.replyTo,
      model.isDeleted,
      model.cretedAt,
      model.conversationId,
      model.senderId
    );
  },
  toModel(entity: Message): Partial<MessageModel> {
    return {
      id: entity.id,
      content: entity.content,
      mediaUrl: entity.mediaUrl,
      type: entity.type,
      replyTo: entity.replyTo,
      isDeleted: entity.isDeleted,
      cretedAt: entity.createdAt,
      conversationId: entity.conversationId,
      senderId: entity.senderId,
    };
  }
}

export class MessageRepositoryImpl extends BaseRepository<MessageModel, Message> implements IMessageRepository {
  constructor() {
    super(MessageModel, MessageMapper);
  }
    findBySenderId(senderId: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    findByRepliesTo(messageId: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    findByConversation(conversationId: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
    findAllByStatus(status: string): Promise<Message[]> {
        throw new Error("Method not implemented.");
    }
}
