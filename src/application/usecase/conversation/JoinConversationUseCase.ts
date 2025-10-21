import { StatusCodes } from "http-status-codes";
import { IConversationParticipantsRepository } from "../../../domain/interfaces/IEntities/IConversationParticipantsRepository";
import { ILog } from "../../../domain/interfaces/ILog";
import { ConversationException } from "../../../shared/errors/ConversationException";
import { IJoinConversation } from "../../../shared/types/JoinConversationRequest";
import { IResponse } from "../../../shared/types/ResponseType";
import { ResponseHandler } from "../../../shared/util/ResponseHandler";
import { AbstractUseCase } from "../base/AbstractUseCase";

export class JoinConversationUseCase extends AbstractUseCase<IJoinConversation, IResponse<boolean>>  {
    constructor(private readonly conversationParticipantsRepository: IConversationParticipantsRepository, logger: ILog) {
        super(logger);
    }
    
    protected async perform(input: IJoinConversation): Promise<IResponse<boolean>> {
        // 
        const conversationParticipants = await this.conversationParticipantsRepository.findConversationByConversationId(input.conversationId, input.userId);
        
        //
        if (!conversationParticipants) throw new ConversationException('Conversation ID and ID User dont on same chat room', StatusCodes.UNAUTHORIZED);        

        //
        const response = ResponseHandler.success('User can entry on chatroom', undefined, true);
        
        // 
        return response;
    }

}