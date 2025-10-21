import { IMessageQueue } from "../../domain/interfaces/IMessageQueue";
import { DPOMessage } from "../../infrastructure/dpo/Message";

export class MessageValidatorService {
    constructor(private readonly messageQueue: IMessageQueue) {};

    async validateMessage(message: DPOMessage): Promise<{valid: boolean; userId: string}> {
        const result = await this.messageQueue.sendForValidation(message)
        return result;
    }
}