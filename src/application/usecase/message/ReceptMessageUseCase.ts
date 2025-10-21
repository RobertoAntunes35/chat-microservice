import { Message } from "../../../domain/entities/MessageEntitie";
import { IMessageRepository } from "../../../domain/interfaces/IEntities/IMessageRepository";
import { ILog } from "../../../domain/interfaces/ILog";
import { IResponse } from "../../../shared/types/ResponseType";
import { AbstractUseCase } from "../base/AbstractUseCase";


export class ReceptMessageUseCase extends AbstractUseCase<string, IResponse<Message>>{
    
    constructor(private messageRepository: IMessageRepository,logger: ILog) { 
        super(logger)
    }

    protected perform(input: string): Promise<IResponse<Message>> {
        throw new Error('Method not implemented.');
    }

}