// application/use-cases/SendMessageUseCase.ts
import { ILog } from '../../../domain/interfaces/ILog';
import { AbstractUseCase } from '../base/AbstractUseCase';
import { IResponse } from '../../../shared/types/ResponseType';
import { DPOConversation } from '../../../infrastructure/dpo/Conversation';
import { IConversationRepository } from '../../../domain/interfaces/IEntities/IConversationRepository';
import { ResponseHandler } from '../../../shared/util/ResponseHandler';
import { Conversation } from '../../../domain/entities/ConversationEntitie';

export class FindAllConversationUseCase extends AbstractUseCase<DPOConversation, IResponse<Conversation>> {
    constructor(private conversationRepository: IConversationRepository, logger: ILog) {
        super(logger)
    }

    protected async perform(conversation?: DPOConversation): Promise<IResponse<Conversation>> {
        try {
            const data: Conversation[] =  await this.conversationRepository.findAll();
            console.log('DATA====>', data)
            return ResponseHandler.success('Message return successfully', undefined, data)
        } catch (err: any) {
            return ResponseHandler.error(err);
        }
    }
}