interface StoryProgressBarProps {
  totalStories: number;
  currentIndex: number;
  progress: number;
}

const StoryProgressBar = ({
  totalStories,
  currentIndex,
  progress,
}: StoryProgressBarProps) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex gap-1 z-20">
      {Array.from({ length: totalStories }).map((_, index) => (
        <div
          key={index}
          className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
        >
          <div
            className="h-full bg-white transition-all duration-100"
            style={{
              width:
                index < currentIndex
                  ? "100%"
                  : index === currentIndex
                    ? `${progress}%`
                    : "0%",
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default StoryProgressBar;
