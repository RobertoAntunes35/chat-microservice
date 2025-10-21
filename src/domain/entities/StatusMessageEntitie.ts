import { MessageStatus } from "../value-objects/MessageStatus";


export class StatusMessage {
  constructor(
    private readonly id: string,
    private status: MessageStatus,
    private updatedAt: Date,
    private readonly userId: number,
    private readonly messageId: string
  ) { }


  /**
    * Aqui, posso incluir as regras de negocio para a entitie, como por ex
  */

  alterStatusMessage(status: MessageStatus) {
    this.status = status;
  }

  alterDateUpdate(date: Date) {
    this.updatedAt = date
  }
}