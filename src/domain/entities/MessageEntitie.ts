export class Message {
  constructor(
    public readonly id: string,          
    public content: string,
    public mediaUrl: string | null,
    public type: string,
    public replyTo: number,               
    public isDeleted: boolean,
    public readonly createdAt: Date, 
    public conversationId: string,
    public senderId: number,
  ) {}
}