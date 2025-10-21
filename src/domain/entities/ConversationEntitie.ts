export class Conversation {
  constructor(
    public readonly id: string,          
    public name: string, 
    public readonly createdBy: string, 
    public readonly createdAt: Date
  ) {}


  /**
   * Aqui, posso incluir as regras de negocio para a entitie
   */
}



