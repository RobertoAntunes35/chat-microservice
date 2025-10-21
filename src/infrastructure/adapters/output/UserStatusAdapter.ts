import { IUserStatusService } from "../../../domain/interfaces/IUserStatusService";


export class UserStatusAdapter implements IUserStatusService {
    isOnline(userId: string): Promise<boolean> {
        // verifica se o usuario esta online
        throw new Error("Method not implemented.");
    }

}