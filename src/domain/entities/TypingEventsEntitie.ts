
export class TypingEvent {
    constructor(
        private readonly id: string,
        private startedAt: Date,
        private endedAt: Date,
        private readonly userId: number,
        private readonly conversationId: string
    ) { }

    /**
  * Aqui, posso incluir as regras de negocio para a entitie, como por ex
  */

    alterInitEvent(date: Date) {
        this.startedAt = date
    }
    alterEndEvent(date: Date) {
        this.endedAt = date
    }
}