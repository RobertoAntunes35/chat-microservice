import {ICreatLog, ILogInfo, LogEntry, RabbitmqConnection, RoutingKeyTypes} from 'shared-lib'
import { ILog } from '../../../../domain/interfaces/ILog';


export class LogAdapterInfo implements ILog {

    constructor(private logService: LogEntry, private rabbitMQService: RabbitmqConnection) {}

    async generateLog(log: ICreatLog): Promise<ILogInfo> {
        return await this.logService.generateLog(log)
    }

    async sendLog(log: ILogInfo, routingKey: RoutingKeyTypes): Promise<void> {
        return await this.rabbitMQService.sendLog(log, routingKey);
    }


}