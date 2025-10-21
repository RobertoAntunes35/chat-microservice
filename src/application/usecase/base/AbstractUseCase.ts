import { ILog } from "../../../domain/interfaces/ILog";
import { IResponse } from "../../../shared/types/ResponseType";
import { LogHandler } from "../../../shared/util/LogHandler";


export abstract class AbstractUseCase<DPOMessage, Response extends IResponse<any>> {
    private logHandler: LogHandler
    constructor(private logger: ILog) { this.logHandler = new LogHandler(logger) }

    public async execute(input?: DPOMessage): Promise<Response> {
        try {

            const response = await this.perform(input);
            console.log('REPONSE_ABSTRATCT', response);

            await this.logHandler.info({
                event: response.message,
                status: `${response.status}`,
                userId: "user",
                sourceIp: '127.0.0.1'
            })
        
            return response;

        } catch (err: any) {
            await this.logHandler.error({
                event: 'Erro ao criar conversa',
                status: '500',
                userId: 'robertoantunes@teste.123',
                device: 'chat-service',
                details: {
                    reason: err.message || 'Erro desconhecido',
                    targetUser: 'N/A',
                },
            }, err);

            throw err;
        }
    }

    protected abstract perform(input?: DPOMessage): Promise<Response>
}