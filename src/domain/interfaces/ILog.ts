import { ICreatLog, ILogInfo, RoutingKeyTypes } from "shared-lib";


export interface ILog {
    generateLog(log: ICreatLog): Promise<ILogInfo>;
    sendLog(log: ILogInfo, routingKey: RoutingKeyTypes): Promise<void>;
}