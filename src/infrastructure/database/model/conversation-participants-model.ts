import { CreationOptional, DataTypes, ForeignKey, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/config-postgres";


('Chamado tabela de ConversationParticipants.')
export class ConversationParticipantsModel extends Model {
    declare id: CreationOptional<string>;
    declare isAdmin: boolean;
    declare joinedAt: Date; 
    declare userId: string;
    declare conversationId: ForeignKey<string>;
}

ConversationParticipantsModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    joinedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.UUID,
        references: {
            model: 'conversation',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { 
    sequelize, 
    tableName: 'conversation_participants'
})

