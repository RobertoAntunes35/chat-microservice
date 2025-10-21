// shared/utils/LogHandler.ts

import { v4 as uuidv4 } from 'uuid';
import { ILog } from '../../domain/interfaces/ILog';
import { ICreatLog, IDetails, RoutingKeyTypes } from 'shared-lib';

interface LogParams {
  event: string;
  status: string;
  userId: string | number;
  sourceIp?: string;
  device?: string;
  details?: IDetails;
}

type LogLevel = 'info' | 'warn' | 'error';

export class LogHandler {
  constructor(private logger: ILog) {}

  private async generateBaseLog(level: LogLevel, params: LogParams): Promise<ICreatLog> {
    return {
      logId: uuidv4(),
      level,
      timestamp: new Date().toISOString(),
      userId: params.userId,
      event: params.event,
      sourceIp: params.sourceIp || '127.0.0.1',
      device: 'chat-service',
      status: params.status,
      details: params.details || {
        reason: 'N/A',
        targetUser: 'N/A',
      },
    };
  }

  public async info(params: LogParams) {
    const log = await this.generateBaseLog('info', params);
    const finalLog = await this.logger.generateLog(log);
    await this.logger.sendLog(finalLog, RoutingKeyTypes.INFO);
  }

  public async warn(params: LogParams) {
    const log = await this.generateBaseLog('warn', params);
    const finalLog = await this.logger.generateLog(log);
    await this.logger.sendLog(finalLog, RoutingKeyTypes.WARN);
  }

  public async error(params: LogParams, error?: any) {
    const log = await this.generateBaseLog('error', params);
    const finalLog = await this.logger.generateLog(log);
    await this.logger.sendLog(finalLog, RoutingKeyTypes.ERROR);

    if (error) console.error('[ERROR LOGGED]', error);
  }
}
