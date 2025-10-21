import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { IResponse } from "../types/ResponseType";


export class ResponseHandler {
    static success<T>(message: string, status = StatusCodes.OK, data: T[] | T = []): IResponse<any> {

        const response: IResponse<T> = {
            message,
            status,
            data,
            timestamp: new Date()
        }

        
        
        if (Array.isArray(data)) {
            response.meta = {
                total: data.length,
                limit: 10,
                offset: 0
            }
        }

        return response
    }

    static error(err: any): IResponse<any> {
        return {
            message: err?.message || ReasonPhrases.BAD_REQUEST,
            status: err?.status || StatusCodes.BAD_REQUEST,
            timestamp: new Date()
        }
    }
}