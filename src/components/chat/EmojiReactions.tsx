interface EmojiReactionsProps {
  reactions: { [emoji: string]: string[] };
  currentUser: string;
  onToggleReaction: (emoji: string) => void;
}

const EmojiReactions = ({
  reactions,
  currentUser,
  onToggleReaction,
}: EmojiReactionsProps) => {
  return (
    <div className="flex flex-wrap gap-1 mt-2">
      {Object.entries(reactions).map(([emoji, users]) => {
        const hasReacted = users.includes(currentUser);
        const count = users.length;

        if (count === 0) return null;

        return (
          <button
            key={emoji}
            onClick={() => onToggleReaction(emoji)}
            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all ${
              hasReacted
                ? "bg-purple-600 text-white"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <span>{emoji}</span>
            <span>{count}</span>
          </button>
        );
      })}
    </div>
  );
};

export default EmojiReactions;
