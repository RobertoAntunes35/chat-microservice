


export interface IStatusMessageRepository {
    updateStatus(messageId: string, userId: string, status: string): Promise<void>;
}