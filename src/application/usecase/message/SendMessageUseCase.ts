import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { Message } from "../../../domain/entities/MessageEntitie";
import { IMessageRepository } from "../../../domain/interfaces/IEntities/IMessageRepository";
import { ILog } from "../../../domain/interfaces/ILog";
import { INotificationService } from "../../../domain/interfaces/INotificationService";
import { IUserStatusService } from "../../../domain/interfaces/IUserStatusService";
import { DPOMessage } from "../../../infrastructure/dpo/Message";
import { MessageException } from "../../../shared/errors/MessageException";
import { IResponse } from "../../../shared/types/ResponseType";
import { MessageValidatorService } from "../../services/MessageValidatorService";
import { AbstractUseCase } from "../base/AbstractUseCase";


export class SendMessageUseCase extends AbstractUseCase<DPOMessage, IResponse<Message>> {
    constructor(
        private messageRepository: IMessageRepository,
        logger: ILog,
        private readonly messageValidator: MessageValidatorService,
        private readonly userStatus: IUserStatusService,
        private readonly notification: INotificationService) {
        super(logger)
    }

    protected async perform(input: DPOMessage): Promise<IResponse<Message>> {
        try {

            // emite evento que recebeu uma mensagem para o rabbitmq
            // aguarda retorno da mensagem, ouvindo a queue do rabbitmq para ser analisada com o service de IA validador
            const validation = await this.messageValidator.validateMessage(input);
            console.log('passou validation')

            // mensagem validada? 
            if (!validation) throw new MessageException("The message could not be forwarded due to violations of the created policy.", StatusCodes.BAD_REQUEST);
            // sim
            // salva no banco 
            await this.messageRepository.create(input.message);
            // usuario online?
            const isOnline = await this.userStatus.isOnline(input.message.id);
            if (isOnline) await this.notification.sendByWebsocket(input.message.id, input);
            else await this.notification.sendByHttp(input.message.id, input);
            return {
                status: StatusCodes.OK,
                message: 'Message forwarded successfully.',
                timestamp: new Date()
            };
        } catch (err: any) {
            return {
                message: err.message ? err.message : ReasonPhrases.BAD_REQUEST,
                status: err.status ? err.status : StatusCodes.BAD_REQUEST,
                timestamp: new Date()
            }
        }
    }
}