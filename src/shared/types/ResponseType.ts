
interface Meta {
    total: number,
    limit: number,
    offset: number

}
export interface IResponse<T> {
    status: number,
    message: string,
    data?: T[] | T,
    timestamp?: Date,
    meta?: Meta
}