export interface IStatusMessageService {
    markAsDelivered(messageId: string, userId: string): Promise<void>;
    markAsRead(messageId: string, userId: string): Promise<void>;
}