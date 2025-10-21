export interface IUserStatusService {
    isOnline(userId: string): Promise<boolean>;
}