import { generateChatTitle, genrateResponse } from "../services/ai.services.js";
import messageModel from "../model/message.model.js";
import chatModel from "../model/chat.model.js";

export async function message(req, res, next) {
  try {
    const { message, chat: chatId } = req.body;

    let title = null, chat = null;

    if (!chatId) {
      title = await generateChatTitle(message);
      chat = await chatModel.create({
        user: req.user.id || req.user._id,
        title,
      });

      chatId = chat._id;
    } else {
      chat = await chatModel.findById(chatId);
    }

    await messageModel.create({
      chat: chatId,
      content: message,
      role: "user",
    });

    const messages = await messageModel.find({ chat: chatId });

    const result = await genrateResponse(messages);

    const aiMessage = await messageModel.create({
      chat: chatId,
      content: result,
      role: "ai",
    });

    console.log(messages);

    res.status(201).json({
      title,
      chat,
      aiMessage,
    });
  } catch (err) {
    next(err);
  }
}

export async function getChats(req, res, next) {
    const user = req.user
    console.log(user)
    const chats = await chatModel.find({ user: user.id})

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

export async function getMessages(req, res, next) {
  try {
    const { chatId } = req.params;

    const chat = await chatModel.findOne({
      _id: chatId,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        message: "chat not found",
      });
    }

    const messages = await messageModel.find({
      chat: chatId,
    });

    res.status(200).json({
      message: "Messages retrieved successfully",
      messages,
    });
  } catch (err) {
    next(err);
  }
}
