import { BaseRepository } from "./base-repository";
import { ConversationParticipantsModel } from "../database/model";
import { ConversationParticipants } from "../../domain/entities/ConversationParticipantsEntitie";
import { IConversationParticipantsRepository } from "../../domain/interfaces/IEntities/IConversationParticipantsRepository";
import { IInputCreateConversation } from "../../shared/types/InputsType";
import { Conversation } from "../../domain/entities/ConversationEntitie";

const ConversationPartipantsMapper = {
    toEntity(model: ConversationParticipantsModel): ConversationParticipants {
        return new ConversationParticipants(
            model.id,
            model.joinedAt,
            model.userId,
            model.conversationId,
            model.isAdmin
        );
    },
    toModel(entity: ConversationParticipants): Partial<ConversationParticipantsModel> {
        return {
            id: entity.id,
            joinedAt: entity.joinedAt,
            conversationId: entity.conversationId,
            userId: entity.userId,
            isAdmin: entity.isAdmin
        };
    }
}

export class ConversationParticipantsRepositoryImp extends BaseRepository<ConversationParticipantsModel, ConversationParticipants> implements IConversationParticipantsRepository {
    constructor() {
        super(ConversationParticipantsModel, ConversationPartipantsMapper);
    }

    
    async findConversationByConversationId(conversationId: string, userId: string): Promise<Conversation> {
        return new Conversation(conversationId, 'chat123', userId, new Date());
    }

    async createConversationBetweenOriginAndDestiny(input: IInputCreateConversation, idConversation: string): Promise<void> {
        //
        const clientOrigin: Partial<ConversationParticipants> = {
            joinedAt: new Date(),
            isAdmin: true,
            userId: input.idClientOrigin,
            conversationId: idConversation
        }

        //
        const clientDestiny: Partial<ConversationParticipants> = {
            joinedAt: new Date(),
            userId: input.idClientDestin,
            conversationId: idConversation
        }

        //
        await ConversationParticipantsModel.create(clientOrigin);
        await ConversationParticipantsModel.create(clientDestiny);
    }
}
