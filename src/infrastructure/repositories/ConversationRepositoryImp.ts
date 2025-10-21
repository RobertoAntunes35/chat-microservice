import { BaseRepository } from "./base-repository";
import { ConversationModel, ConversationParticipantsModel } from "../database/model";
import { Conversation } from "../../domain/entities/ConversationEntitie";
import { IConversationRepository } from "../../domain/interfaces/IEntities/IConversationRepository";
import { IInputCreateConversation } from "../../shared/types/InputsType";
import { v4 as uuidv4 } from 'uuid';
import { IConversationParticipantsRepository } from "../../domain/interfaces/IEntities/IConversationParticipantsRepository";

const ConversationMapper = {
  toEntity(model: ConversationModel): Conversation {
    return new Conversation(
      model.id,
      model.name,
      model.createdBy,
      model.createdAt
    );
  },
  toModel(entity: Conversation): Partial<ConversationModel> {
    return {
      id: entity.id,
      name: entity.name,
      createdAt: entity.createdAt,
      createdBy: entity.createdBy
    };
  }
}

export class ConversationRepositoryImp extends BaseRepository<ConversationModel, Conversation> implements IConversationRepository {
  constructor(private readonly conversationParticipantsRepository: IConversationParticipantsRepository) {
    super(ConversationModel, ConversationMapper);
  }

  /**
   * 
   * @param input 
   * @returns 
   */
  public async findConversationBetweenTwoUsersOrCreate(input: IInputCreateConversation): Promise<Conversation> {
    //
    const conversation = await this.findConversationBetweenTwoUsers(input.idClientOrigin, input.idClientOrigin);
    //
    if (!conversation) return this.createConversation(input);
    //
    return conversation;
  }

  /**
   * 
   * @param userA 
   * @param userB 
   * @returns 
   */
  private async findConversationBetweenTwoUsers(userA: string, userB: string): Promise<Conversation | null> {
    const conversation = await ConversationModel.findOne({
      include: [
        {
          model: ConversationParticipantsModel,
          as: 'participants',
          where: {
            userId: [userA, userB]
          },
          attributes: ['userId']
        }
      ]
    });
    return conversation ? ConversationMapper.toEntity(conversation) : null
  }


  /**
   * 
   * @param input 
   * @returns 
   */
  private async createConversation(input: IInputCreateConversation): Promise<Conversation> {

    const id = uuidv4();

    const conversation: Conversation = await ConversationModel.create({
      id,
      name: `chat-${id}`,
      createdAt: new Date(),
      createdBy: input.idClientOrigin,
    });
 
    await this.conversationParticipantsRepository.createConversationBetweenOriginAndDestiny(input, id);
    
    return conversation;
  }
}
