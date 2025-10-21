import { Router } from 'express'
import { ConversationController } from '../controller/ConversationController';

export let globalRouterConversation = Router();

export default function configureRoutesConversation(conversationController: ConversationController) {
  globalRouterConversation.post('/api/chat/create/conversation', conversationController.createConversation.bind(conversationController));

  globalRouterConversation.get('/api/chat/get/all', conversationController.getAll.bind(conversationController));
}
