import { useSelector } from "react-redux";
import { useChat } from "../hooks/useChat.js";
import { useEffect, useState } from "react";
import { Send, ShoppingBag, Zap, Calendar } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Dashboard = () => {
  const chat = useChat();
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.auth.user);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim()) return;
    const msg = message;
    setMessage("");
    await chat.handleSendMessage({ message: msg, chatId: currentChatId });
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
  };

  useEffect(() => {
    chat.initalizeSocketConnection();
    chat.handleGetChats();
  }, []);

  return (
    <div className="flex h-screen bg-black text-white">
      <div className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-2xl font-bold  ">zena</h1>
        </div>

        <div className="px-4 py-4">
          <input
            type="text"
            placeholder="Search conversation"
            className="w-full px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm focus:outline-none placeholder-neutral-600"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 space-y-4">
          <div>
            <h3 className="mt-5 text-xs text-neutral-500 bold  uppercase mb-3 px-2">
              Recent conversations
            </h3>
            {Object.values(chats).map((chat) => (
              <button
                key={chat.id}
                onClick={() => openChat(chat.id)}
                className="w-full text-left p-3 hover:bg-neutral-900 rounded-lg"
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-neutral-800">
          <button className="w-full px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg">
            Upgrade
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {chats[currentChatId]?.messages?.length > 0 ? (
          <div  id="messagemain"  className="flex-1 overflow-y-auto p-8 space-y-6">
            {chats[currentChatId].messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[70%] p-4 rounded-xl whitespace-pre-wrap ${
                    msg.role === "user"
                      ? " text-white "
                      : " text-300 "
                  }`}
                >
                  <div className="prose prose-invert max-w-none">
                    <ReactMarkdown remarkPlugins={remarkGfm}>{msg.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center overflow-y-auto">
            <h2 className="text-5xl font-bold">
              Hey{" "}
              <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {user?.username || "User"}
              </span>
              !
            </h2>
            <p className="pt-5 text-3xl text-neutral-500 mb-12">
              What can I help you today?
            </p>
          </div>
        )}

        {/* Input */}
        <div className="px-8 pb-8 pt-4">
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask anything..."
              className="flex-1 px-6 py-4 bg-transparent outline-none"
            />
            <button className="pr-2" onClick={handleSend}>
              <div className="p-2 bg-white rounded-full">
                <Send className="w-5 h-5 text-black" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
