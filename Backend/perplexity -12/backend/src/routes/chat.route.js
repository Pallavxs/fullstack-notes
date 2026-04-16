import { getChats, getMessages, message, deleteChat } from '../controller/chat.controller.js'
import { Router } from 'express'
import { authMiddlerware } from '../middleware/auth.middlerware.js';

const chatRouter = Router();

chatRouter.post('/message', authMiddlerware, message)

chatRouter.get('/', authMiddlerware, getChats )

chatRouter.get('/:chatId/message', authMiddlerware, getMessages)

chatRouter.delete("/delete/:chatId", authMiddlerware, deleteChat)

export default chatRouter;

