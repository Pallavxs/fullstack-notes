<div className="flex h-screen bg-black text-white">
      
      {/* Sidebar */}
      <div className="w-64 bg-neutral-950 border-r border-neutral-800 flex flex-col overflow-hidden">

        <div className="p-6 border-b border-neutral-800">
          <h1 className="text-2xl font-bold">zena.</h1>
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
            <h3 className="text-xs text-neutral-500 uppercase mb-3 px-2">Today</h3>
            {conversations.slice(0, 3).map((conv) => (
              <div key={conv.id} className="p-3 rounded-lg hover:bg-neutral-900 cursor-pointer">
                <p className="text-sm font-medium truncate">{conv.title}</p>
                <p className="text-xs text-neutral-500 mt-1">{conv.subtitle}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs text-neutral-500 uppercase mb-3 px-2">Yesterday</h3>
            {conversations.slice(3, 4).map((conv) => (
              <div key={conv.id} className="p-3 rounded-lg hover:bg-neutral-900 cursor-pointer">
                <p className="text-sm font-medium truncate">{conv.title}</p>
                <p className="text-xs text-neutral-500 mt-1">{conv.subtitle}</p>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xs text-neutral-500 uppercase mb-3 px-2">5 days ago</h3>
            {conversations.slice(4).map((conv) => (
              <div key={conv.id} className="p-3 rounded-lg hover:bg-neutral-900 cursor-pointer">
                <p className="text-sm font-medium truncate">{conv.title}</p>
                <p className="text-xs text-neutral-500 mt-1">{conv.subtitle}</p>
              </div>
            ))}
          </div>

        </div>

        <div className="p-4 border-t border-neutral-800">
          <button className="w-full px-4 py-2 bg-neutral-900 hover:bg-neutral-800 rounded-lg">
            Upgrade
          </button>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">

        <div className="flex-1 flex flex-col items-center justify-center px-8 py-12 text-center">
          <h2 className="text-5xl font-bold">
            Hey <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {user?.name || "User"}
            </span>!
          </h2>
          <p className="text-3xl text-neutral-500 mb-12">What can I help you today?</p>

          <div className="grid grid-cols-3 gap-4">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button key={action.id} className="p-6 border border-neutral-800 rounded-lg group hover:bg-neutral-950">
                  <Icon className="w-6 h-6 mb-3 text-neutral-400 group-hover:text-blue-400" />
                  <span className="text-sm text-neutral-300 group-hover:text-white">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="px-8 pb-8">
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-full">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 px-6 py-4 bg-transparent outline-none"
            />
            <button className="pr-2">
              <div className="p-2 bg-white rounded-full">
                <Send className="w-5 h-5 text-black" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>