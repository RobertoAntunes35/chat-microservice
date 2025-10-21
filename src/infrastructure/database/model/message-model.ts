import { CreationOptional, DataTypes, ForeignKey, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/config-postgres";


('Chamado tabela de MessageModel.')
export class MessageModel extends Model {
    declare id: CreationOptional<string>;
    declare content: string;
    declare mediaUrl: string | null;
    declare type: string;
    declare replyTo: number;
    declare isDeleted: boolean;
    declare cretedAt: CreationOptional<Date>;
    declare conversationId: ForeignKey<string>;
    declare senderId: number
}


MessageModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mediaUrl: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    replyTo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    senderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'conversation',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, {
    sequelize,
    tableName: 'message'
})




