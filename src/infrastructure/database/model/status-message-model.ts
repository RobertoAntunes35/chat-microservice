import { CreationOptional, DataTypes, EnumDataType, ForeignKey, Model } from "sequelize";
import sequelize from "../../../config/database/config-postgres";
import { MessageModel } from "./message-model";

enum MessageStatus {
    ENVIADO = 'enviado',
    ENTREGUE = 'entregue',
    LIDO = 'lido'
}


('Chamado tabela de StatusMessageModel.')
export class StatusMessageModel extends Model {
    declare id: CreationOptional<string>;
    declare status: EnumDataType<MessageStatus>;
    declare updatedAt: Date;
    declare userId: number;
    declare messageId: ForeignKey<string>;

}

StatusMessageModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM(...Object.values(MessageStatus)) as EnumDataType<MessageStatus>,
        allowNull: false,
        defaultValue: MessageStatus.ENVIADO
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    messageId: {
        type: DataTypes.UUID,
        references: {
            model: 'message',
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
}, { 
    sequelize, 
    tableName: 'status_message'
})
