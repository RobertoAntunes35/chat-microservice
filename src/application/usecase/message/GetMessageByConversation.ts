// application/use-cases/SendMessageUseCase.ts
import { ILog } from '../../../domain/interfaces/ILog';
import { AbstractUseCase } from '../base/AbstractUseCase';
import { IResponse } from '../../../shared/types/ResponseType';
import { ResponseHandler } from '../../../shared/util/ResponseHandler';
import { DPOMessage } from '../../../infrastructure/dpo/Message';
import { Message } from '../../../domain/entities/MessageEntitie';
import { IMessageRepository } from '../../../domain/interfaces/IEntities/IMessageRepository';

export class GetMessageByConversation extends AbstractUseCase<DPOMessage, IResponse<Message>> {
    constructor(private messageRepository: IMessageRepository, logger: ILog) {
        super(logger)
    }

    protected async perform(conversation?: DPOMessage): Promise<IResponse<Message>> {
        try {
            const data: Message[] =  await this.messageRepository.findByConversation(conversation!.message.id);
            return ResponseHandler.success('Message return successfully', undefined, data)
        } catch (err: any) {
            return ResponseHandler.error(err);
        }
    }
}