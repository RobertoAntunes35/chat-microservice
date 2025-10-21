import { Request, Response } from "express";
import { DPOMessage } from "../../../dpo/Message";
import { Message } from "../../../../domain/entities/MessageEntitie";

import {v4 as uuidv4} from 'uuid'
import { SendMessageUseCase } from "../../../../application/usecase/message/SendMessageUseCase";



export class MessageController {
    constructor(private sendMessageUseCase: SendMessageUseCase) { }

    async sendMessage(req: Request, res: Response): Promise<void> {
        // pega info do body
        const body = req.body;
        // encaminha mensagem para ser analisada~
        const messageSend = new Message(uuidv4(), 'Olá, como você está?', null, 'abc', 1, false, new Date(), uuidv4(), 2);
        const message = await this.sendMessageUseCase.execute({ message: messageSend });
        res.status(201).json(message);
    }
}