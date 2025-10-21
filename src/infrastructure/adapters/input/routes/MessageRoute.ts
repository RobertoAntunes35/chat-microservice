import { Router } from 'express'
import { MessageController } from '../controller/MessageController';

export let globalRouter = Router();

export default function configureRoutes(messageController: MessageController) {
  globalRouter.post('/api/chat/send-message', messageController.sendMessage.bind(messageController))
}
