import { LogEntry, RabbitmqConnection } from "shared-lib";
import { LogAdapterError } from "./infrastructure/adapters/output/log/LogAdapterError";
import { MessageQueueAdapter } from "./infrastructure/adapters/output/MessageQueueAdapter";
import { UserStatusAdapter } from "./infrastructure/adapters/output/UserStatusAdapter";
import { NotificationAdapter } from "./infrastructure/adapters/output/NotificationAdapter";
import { MessageValidatorService } from "./application/services/MessageValidatorService";
import { MessageRepositoryImpl } from "./infrastructure/repositories/MessageRepositoryImp";
import { ILog } from "./domain/interfaces/ILog";
import { MessageController } from "./infrastructure/adapters/input/controller/MessageController";
import { ConversationRepositoryImp } from "./infrastructure/repositories/ConversationRepositoryImp";
import { ConversationController } from "./infrastructure/adapters/input/controller/ConversationController";
import { FindAllConversationUseCase } from "./application/usecase/conversation/FindAllConversationUseCase";
import { SendMessageUseCase } from "./application/usecase/message/SendMessageUseCase";
import { ConversationParticipantsRepositoryImp } from "./infrastructure/repositories/ConversationPartipantsImp";
import { CreateConversationUseCase } from "./application/usecase/conversation/CreateConversationUseCase";
import { createServer } from "http";
import { JoinConversationUseCase } from "./application/usecase/conversation/JoinConversationUseCase";
import { SocketGatewayImpl } from "./infrastructure/adapters/SocketGatewayAdapter";
import { Server } from "socket.io";
import { ChatGateway } from "./infrastructure/adapters/ChatGateway";


// Instâncias base

export async function bootstrapDependencies(io: Server) {

  const rabbitmqConnection = new RabbitmqConnection();
  await rabbitmqConnection.init()
  const logService = new LogEntry();
  
  // Adapters
  const logger: ILog = new LogAdapterError(logService, rabbitmqConnection);
  const messageQueue = new MessageQueueAdapter(rabbitmqConnection);
  const userStatusService = new UserStatusAdapter();

  const notificationService = new NotificationAdapter(io);

  // Services e Repositórios
  const messageValidator = new MessageValidatorService(messageQueue);
  const messageRepository = new MessageRepositoryImpl();

  // use case message
  const sendMessageUseCase = new SendMessageUseCase(
    messageRepository,
    logger,
    messageValidator,
    userStatusService,
    notificationService
  );

  // websocket
  const socketGateway = new SocketGatewayImpl(sendMessageUseCase);

  // repository
  const conversationParticipantsRepository = new ConversationParticipantsRepositoryImp()
  const conversationRepository = new ConversationRepositoryImp(conversationParticipantsRepository);
  
  // usecase 
  const createConversationUseCase = new CreateConversationUseCase(conversationRepository, logger);
  const findAllConversationUseCase = new FindAllConversationUseCase(conversationRepository, logger);
  const joinConversationUseCase = new JoinConversationUseCase(conversationParticipantsRepository, logger)

  // chat gateway
  const chatGateway = new ChatGateway(io, joinConversationUseCase, socketGateway)
  chatGateway.initialize();

  // Controller
  const messageController = new MessageController(sendMessageUseCase);
  const conversationController = new ConversationController(createConversationUseCase, findAllConversationUseCase);

  return {messageController, conversationController, joinConversationUseCase}
}
