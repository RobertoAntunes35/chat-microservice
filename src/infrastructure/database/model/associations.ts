import { ConversationModel } from "./conversation-model"
import { ConversationParticipantsModel } from "./conversation-participants-model"
import { MessageModel } from "./message-model"
import { StatusMessageModel } from "./status-message-model"
import { TypingEventsModel } from "./typing-events-model"

export async function associationsModels() {
    ConversationModel.hasMany(MessageModel, { foreignKey: 'conversationId', as: 'messages' });
    ConversationModel.hasMany(ConversationParticipantsModel, { foreignKey: 'conversationId', as: 'participants' });
    ConversationModel.hasMany(TypingEventsModel, { foreignKey: 'conversationId', as: 'typingEvents' });

    StatusMessageModel.belongsTo(MessageModel, { foreignKey: 'messageId', as: 'message' })

    ConversationParticipantsModel.belongsTo(ConversationModel, { foreignKey: 'conversationId', as: 'conversation' });
    MessageModel.belongsTo(ConversationModel, { foreignKey: 'conversationId', as: 'conversation' });
    MessageModel.hasOne(StatusMessageModel, { foreignKey: 'messageId', as: 'status' });
    TypingEventsModel.belongsTo(ConversationModel, { foreignKey: 'conversationId', as: 'conversation' });
}