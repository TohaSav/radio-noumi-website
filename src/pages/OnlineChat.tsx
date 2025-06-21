import { useRef } from "react";
import { createMessage } from "@/utils/chatHelpers";
import { useChatState } from "@/hooks/useChatState";
import { useChatMessages } from "@/hooks/useChatMessages";
import { useOnlineUsers } from "@/hooks/useOnlineUsers";
import { useRadioStats } from "@/hooks/useRadioStats";
import ChatRegistration from "@/components/chat/ChatRegistration";
import ChatContainer from "@/components/chat/ChatContainer";
import HiddenRadio from "@/components/HiddenRadio";
import EnhancedAutoMessageGenerator from "@/components/chat/EnhancedAutoMessageGenerator";

const OnlineChat = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const radioStats = useRadioStats();

  const {
    messageInput,
    setMessageInput,
    userName,
    userAvatar,
    isLoggedIn,
    registeredUsers,
    showUserPanel,
    setShowUserPanel,
    replyTo,
    setReplyTo,
    handleRegister,
    handleLogin,
  } = useChatState();

  const { messages, addMessage, deleteMessage, addReaction } =
    useChatMessages();

  const { activeUsers, updateUsers, addUser } = useOnlineUsers(
    isLoggedIn,
    userName,
    userAvatar,
  );

  const handleSendMessage = () => {
    if (!messageInput.trim() || !isLoggedIn) return;

    const newMessage = createMessage(
      userName,
      userAvatar,
      messageInput,
      "text",
      replyTo,
    );

    addMessage(newMessage);
    setMessageInput("");
    setReplyTo(null);
  };

  const handleAutoMessage = (autoMessage: any) => {
    const newMessage = createMessage(
      autoMessage.userName,
      autoMessage.avatar,
      autoMessage.message,
      autoMessage.type,
      null,
      autoMessage.mediaUrl,
    );
    addMessage(newMessage);
  };

  const handleMediaSend = (file: File, type: "image" | "video") => {
    if (!isLoggedIn) return;

    const mediaUrl = URL.createObjectURL(file);
    const newMessage = createMessage(
      userName,
      userAvatar,
      "",
      type,
      replyTo,
      mediaUrl,
    );

    addMessage(newMessage);
    setReplyTo(null);
  };

  const handleVoiceSend = (audioBlob: Blob, duration: number) => {
    if (!isLoggedIn) return;

    const audioUrl = URL.createObjectURL(audioBlob);
    const newMessage = createMessage(
      userName,
      userAvatar,
      "",
      "voice",
      replyTo,
      audioUrl,
      duration,
    );

    addMessage(newMessage);
    setReplyTo(null);
  };

  const handleReaction = (messageId: string, emoji: string) => {
    addReaction(messageId, emoji, userName);
  };

  const handleUserRegister = (userData: { name: string; avatar: string }) => {
    handleRegister(userData);
    addUser(userData);
  };

  if (!isLoggedIn) {
    return (
      <ChatRegistration
        onRegister={handleUserRegister}
        existingUsers={registeredUsers}
      />
    );
  }

  return (
    <>
      <ChatContainer
        messages={messages}
        messageInput={messageInput}
        userName={userName}
        userAvatar={userAvatar}
        activeUsers={activeUsers}
        replyTo={replyTo}
        showUserPanel={showUserPanel}
        onMessageChange={setMessageInput}
        onSendMessage={handleSendMessage}
        onMediaSend={handleMediaSend}
        onVoiceSend={handleVoiceSend}
        onReply={setReplyTo}
        onDeleteMessage={deleteMessage}
        onReaction={handleReaction}
        onCancelReply={() => setReplyTo(null)}
        onToggleUserPanel={() => setShowUserPanel(!showUserPanel)}
        onAddMessage={addMessage}
      />
      <HiddenRadio streamUrl="https://radio.noumi.fm/stream" />
    </>
  );
};

export default OnlineChat;
