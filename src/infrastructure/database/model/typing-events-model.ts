import { CreationOptional, DataTypes, EnumDataType, ForeignKey, Model } from "sequelize";
import sequelize from "../../../config/database/config-postgres";


export class TypingEventsModel extends Model {
    declare id: CreationOptional<string>;
    declare startedAt: Date;
    declare endedAt: Date; 
    declare userId: number;
    declare conversationId: ForeignKey<string>;
}

TypingEventsModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endedAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
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
    tableName: 'typing_events'
})


