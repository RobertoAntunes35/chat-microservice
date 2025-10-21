import { DPOMessage } from "../../infrastructure/dpo/Message";

export interface IMessageQueue {
    sendForValidation(message: DPOMessage): Promise<{valid: boolean, userId: string}>
}