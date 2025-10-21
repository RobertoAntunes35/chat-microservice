import { CreationOptional, DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/config-postgres";
import { ConversationParticipantsModel } from "./conversation-participants-model";


export class ConversationModel extends Model {
    declare id: CreationOptional<string>;
    declare name: string;
    declare createdBy: string;
    declare createdAt: CreationOptional<Date>

    declare participants?: ConversationParticipantsModel[];
}



ConversationModel.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdBy: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
}, {
    sequelize,
    tableName: "conversation"
})



