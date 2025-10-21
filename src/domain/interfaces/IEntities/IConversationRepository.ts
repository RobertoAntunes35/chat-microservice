import { IInputCreateConversation } from "../../../shared/types/InputsType";
import { Conversation } from "../../entities/ConversationEntitie";
import { ICommomRepository } from "./ICommomRepository";

export interface IConversationRepository extends ICommomRepository<Conversation> {
    /**
     * METODOS ESPECIFICOS DA CLASSE
     */
    findConversationBetweenTwoUsersOrCreate(input: IInputCreateConversation): Promise<Conversation>;
}