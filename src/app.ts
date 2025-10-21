import express, { Response, Request } from 'express'
import sequelize from './config/database/config-postgres';
import { associationsModels } from './infrastructure/database/model/associations'
import { MessageController } from './infrastructure/adapters/input/controller/MessageController'
import { bootstrapDependencies } from './container';
import configureRoutes, { globalRouter } from './infrastructure/adapters/input/routes/MessageRoute';
import configureRoutesConversation, { globalRouterConversation } from './infrastructure/adapters/input/routes/ConversationRoute';
import { ConversationController } from './infrastructure/adapters/input/controller/ConversationController';
import { createServer } from 'http';
import { Server } from 'socket.io';
let messageController: MessageController;
let conversationController: ConversationController




async function main() {
    // express
    const app = express()
    
    // patern port
    const PORT: number | string = process.env.PORT || 2000;

    // principal server
    const httpServer = createServer(app);
    
    // websocket server
    const io = new Server(httpServer, {
        cors: { origin: "*",
            methods: ["GET", "POST"]
         }
    });

    // database
    await sequelize.sync({ force: true })
        .then((success) => {
            console.log('TABELAS CRIADAS COM SUCESSO: ', success)
        }).catch((err) => {
            console.log('ERRO AO CRIAR TABELAS: ', err)
        });
    await associationsModels()

    //
    app.use(express.json())

    //
    const { conversationController, messageController } = await bootstrapDependencies(io);
    configureRoutes(messageController)
    configureRoutesConversation(conversationController);

    // 
    app.use(globalRouter)
    app.use(globalRouterConversation)

    app.get('/', (req: Request, resp: Response) => {
        resp.send('Hello, ts + express')
    });




    httpServer.listen(PORT, () => {
        (`Server is running at PORT: ${PORT}`)
    });
}

main().catch(console.error)
export { messageController, conversationController }