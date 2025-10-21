import { ILog } from '../../../domain/interfaces/ILog';
import { AbstractUseCase } from '../base/AbstractUseCase';
import { IResponse } from '../../../shared/types/ResponseType';
import { IConversationRepository } from '../../../domain/interfaces/IEntities/IConversationRepository';
import { ResponseHandler } from '../../../shared/util/ResponseHandler';
import { Conversation } from '../../../domain/entities/ConversationEntitie';
import { IInputCreateConversation } from '../../../shared/types/InputsType';
import { ConversationException } from '../../../shared/errors/ConversationException';
import { StatusCodes } from 'http-status-codes';

export class CreateConversationUseCase extends AbstractUseCase<IInputCreateConversation, IResponse<Conversation>> {
    constructor(private conversationRepository: IConversationRepository, logger: ILog) {
        super(logger)
    }

    protected async perform(input: IInputCreateConversation): Promise<IResponse<Conversation>> {
        try {
            const chat: Conversation = await this.conversationRepository.findConversationBetweenTwoUsersOrCreate(input);
            if (!chat) throw new ConversationException(
                `Can't find or create a conversation between USER: ${input.idClientOrigin} and USER: ${input.idClientDestin}`,
                StatusCodes.BAD_REQUEST);
            return ResponseHandler.success('Conversation was created', undefined, chat)
        } catch (err: any) {
            return ResponseHandler.error(err);
        }
    }
}