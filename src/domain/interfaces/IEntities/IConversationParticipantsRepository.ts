import { IInputCreateConversation } from "../../../shared/types/InputsType";
import { Conversation } from "../../entities/ConversationEntitie";
import { ConversationParticipants } from "../../entities/ConversationParticipantsEntitie";
import { ICommomRepository } from "./ICommomRepository";

export interface IConversationParticipantsRepository extends ICommomRepository<ConversationParticipants>  {
    createConversationBetweenOriginAndDestiny(input: IInputCreateConversation, idConversation: string): Promise<void>;
    findConversationByConversationId(conversationId: string, userId: string): Promise<Conversation>;
}