export interface StatusMessageService {
    markAsDelivered(messageId: string, userId: string): Promise<void>;
    markAsRead(messageId: string, userId: string): Promise<void>;
}

