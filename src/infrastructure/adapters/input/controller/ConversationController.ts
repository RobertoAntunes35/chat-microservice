import { Request, Response } from "express";
import { FindAllConversationUseCase } from "../../../../application/usecase/conversation/FindAllConversationUseCase";
import { IInputCreateConversation } from "../../../../shared/types/InputsType";
import { CreateConversationUseCase } from "../../../../application/usecase/conversation/CreateConversationUseCase";
import { CreateConversationRequestBody } from "../../../../shared/types/CreateConversationRequestBody";



export class ConversationController {
    constructor(
        private createConversationService: CreateConversationUseCase, 
        private findAllConversationUseCase: FindAllConversationUseCase,
        ) { }

    async createConversation(req: Request<unknown, unknown, CreateConversationRequestBody>, res: Response): Promise<void> {
        // body, irá conter idClienteOrigem e idClienteOrigem
        const {idClientOrigin, idClientDestin} = req.body; 
        console.log('ID ORIGIN AND DESTIN: ', idClientOrigin, idClientDestin)
        //
        const input: IInputCreateConversation = {
            idClientDestin: idClientDestin,
            idClientOrigin: idClientOrigin
        }

        //
        const response = await this.createConversationService.execute(input)
        
        // response contem o id do conversation 
        res.status(response.status).json(response);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const body = req.body;
        // encaminha mensagem para ser analisada~
        const data = await this.findAllConversationUseCase.execute();
        res.status(201).json(data);

    }
}