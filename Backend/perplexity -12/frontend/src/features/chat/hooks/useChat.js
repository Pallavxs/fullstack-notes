import { initalizeSocketConnection } from "../service/chat.socket.js";
import {
  sendMessage,
  getChats,
  getMessages,
  deleteChat,
} from "../service/chat.api.js";
import { useDispatch } from "react-redux";
import {
  setChats,
  setLoading,
  setCurrentId,
  setError,
  createNewChat,
  addNewMessage,
  addMessages,
} from "../service/chat.slice.js";

export const useChat = () => {
  const dispatch = useDispatch();

  async function handleSendMessage({ message, chatId }) {
    dispatch(setLoading(true));
    try {
      const data = await sendMessage({ message, chatId });
      const { chat, aiMessage } = data;
      dispatch(
        createNewChat({
          chatId: chat._id,
          title: chat.title,
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: message,
          role: "user",
        }),
      );

      dispatch(
        addNewMessage({
          chatId: chat._id,
          content: aiMessage.content,
          role: "assistant",
        }),
      );
      dispatch(setCurrentId(chat._id));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetChats() {
    dispatch(setLoading(true));
    const data = await getChats();
    const { chats } = data;
    dispatch(
      setChats(
        chats.reduce((acc, chat) => {
          acc[chat._id] = {
            id: chat._id,
            title: chat.title,
            messages: [],
            lastUpdated: chat.updatedAt,
          };
          return acc;
        }, {}),
      ),
    );
    dispatch(setLoading(false));
  }

  async function handleOpenChat(chatId) {
    const data = await getMessages(chatId);
    const { messages } = data;

    const formattedMessages = messages.map((msg) => ({
      content: msg.content,
      role: msg.role === "ai" ? "assistant" : msg.role,
    }));

    dispatch(
      addMessages({
        chatId,
        messages: formattedMessages,
      }),
    );

    dispatch(setCurrentId(chatId));
  }

  return {
    initalizeSocketConnection,
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
  };
};
