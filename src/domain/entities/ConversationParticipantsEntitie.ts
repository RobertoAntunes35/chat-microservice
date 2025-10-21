
export class ConversationParticipants {
    constructor(
        public readonly id: string, 
        public readonly joinedAt: Date,
        public readonly userId: string, 
        public readonly conversationId: string,
        public readonly isAdmin: boolean
    ) {}

    /**
   * Aqui, posso incluir as regras de negocio para a entitie
   */
}

