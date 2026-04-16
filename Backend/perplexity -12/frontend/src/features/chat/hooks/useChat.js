import { initalizeSocketConnection } from "../service/chat.socket.js";
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api.js";
import { useDispatch } from "react-redux";
import { setChats, setLoading, setCurrentId, setError, createNewChat, addNewMessage } from "../service/chat.slice.js"

export const useChat = () => {

    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        try {
            dispatch(setLoading(true))
            const data = await sendMessage({ message, chatId })
            const { chat, aiMessage } = data
            dispatch(createNewChat({
                chatId: chat._id,
                title: chat.title || chat?.title || "New Chat"
            }))
            dispatch(addNewMessage({
                chatId: chat._id,
                content: message,
                role: "user"
            }))
            dispatch(addNewMessage({
                chatId: chat._id,
                content: aiMessage.content,
                role: aiMessage.role || "ai"
            }))
            dispatch(setCurrentId(chat._id))
        } catch (error) {
            console.error("Error sending message", error)
            dispatch(setError(error.message))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        initalizeSocketConnection,
        handleSendMessage
    }
}