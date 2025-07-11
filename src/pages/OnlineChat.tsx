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

  const { activeUsers, addUser } = useOnlineUsers(
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
    // Создаем сообщение с правильной структурой
    const newMessage = {
      id: autoMessage.id,
      userName: autoMessage.userName,
      message: autoMessage.message,
      timestamp: autoMessage.timestamp,
      avatar: autoMessage.avatar,
      type: autoMessage.type,
      mediaUrl: autoMessage.mediaUrl,
      replyTo: autoMessage.replyTo,
    };
    addMessage(newMessage);
  };

  const handleAutoReaction = (
    messageId: string,
    emoji: string,
    userName: string,
  ) => {
    addReaction(messageId, emoji, userName);
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

  const handleVideoSend = (
    videoBlob: Blob,
    duration: number,
    thumbnail: string,
  ) => {
    if (!isLoggedIn) return;

    const videoUrl = URL.createObjectURL(videoBlob);
    const newMessage = createMessage(
      userName,
      userAvatar,
      "",
      "square-video",
      replyTo,
      videoUrl,
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
        onVideoSend={handleVideoSend}
        onReply={setReplyTo}
        onDeleteMessage={deleteMessage}
        onReaction={handleReaction}
        onCancelReply={() => setReplyTo(null)}
        onToggleUserPanel={() => setShowUserPanel(!showUserPanel)}
        onAddMessage={addMessage}
      />
      <EnhancedAutoMessageGenerator
        onMessageGenerated={handleAutoMessage}
        onReactionAdded={handleAutoReaction}
        activeUsers={activeUsers}
        recentMessages={messages.slice(-10)}
      />
      <HiddenRadio streamUrl="https://radio.noumi.fm/stream" />
    </>
  );
};

export default OnlineChat;
