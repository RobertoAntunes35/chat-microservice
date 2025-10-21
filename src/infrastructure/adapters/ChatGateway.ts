import { Server, Socket } from 'socket.io';
import { JoinConversationUseCase } from '../../application/usecase/conversation/JoinConversationUseCase';
import { ISocketGateway } from '../../domain/interfaces/ISocketGateway';
import { IJoinConversation } from '../../shared/types/JoinConversationRequest';


export class ChatGateway {
    constructor(
        private io:Server, 
        private readonly joinChatRoom: JoinConversationUseCase,
        private readonly socketGateway: ISocketGateway) {}

    public initialize() {
        this.io.on('connection', (socket: Socket) => {
            // cliente connectou
            console.log(`🔌 New client connected: ${socket.id}`);

            // emite evento de que alguem entrou na conversa
            socket.on('join-conversation', async(data: IJoinConversation) => {

                // verifica se o usuario pode abrir aquela sala de chat
                const isAllowed = await this.joinChatRoom.execute(data);

                // se o usuario nao puder entrar naquele chat, ou nao ter correlação com o client, não poderá entrar
                if (!isAllowed) {
                    socket.emit('error', {message: 'Usuário não autorizado a entrar na sala.'});
                    return;
                }

                // caso o chat exista entre os dois, o mesmo irá entra
                socket.join(`conversation:${data.conversationId}`);
                await this.socketGateway.sendTypingEvent(data.conversationId, data.userId);
            });

            // envia mensagem
            socket.on('send-message', async ({conversationId, payload}) => {
                await this.socketGateway.sendMessageToConversation(conversationId, payload)
            })
        })
    }
}
