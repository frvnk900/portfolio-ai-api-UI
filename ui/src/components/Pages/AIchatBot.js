import ChatPost from "../ui_compoents/InputArea";
import MessageList from "../ui_compoents/MessageBubble"; 
import { useState } from "react";

export default function ChatBot(){
 const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleMessageSent = (newMessage) => {
 
    setRefreshTrigger(prev => prev + 1);
  };

    return (<>
     <MessageList key={refreshTrigger} />
     <ChatPost onMessageSent={handleMessageSent} />

    </>)
}