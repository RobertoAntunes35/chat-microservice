

import { DPOMessage } from "../../infrastructure/dpo/Message";

export interface INotificationService {
    sendEventUser(userId: string, conversationId: string): Promise<void>;
    sendByHttp(userId: string, message: DPOMessage): Promise<void>
    sendByWebsocket(userId: string, message: DPOMessage): Promise<void>
}