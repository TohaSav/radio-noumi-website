import { Firework, HeartEmoji, CryingEmoji } from "@/types/radio";

interface FireworksEffectProps {
  fireworks: Firework[];
  heartEmojis: HeartEmoji[];
  cryingEmojis: CryingEmoji[];
}

const FireworksEffect = ({
  fireworks,
  heartEmojis,
  cryingEmojis,
}: FireworksEffectProps) => {
  return (
    <>
      {/* Фейерверки */}
      {fireworks.map((firework) => (
        <div
          key={firework.id}
          className="absolute pointer-events-none z-20"
          style={{
            left: firework.x,
            top: firework.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="firework">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="firework-particle"
                style={
                  {
                    "--angle": `${i * 45}deg`,
                    "--color": `hsl(${Math.random() * 360}, 70%, 60%)`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      ))}

      {/* Сердечки */}
      {heartEmojis.map((heart) => (
        <div
          key={heart.id}
          className="absolute pointer-events-none text-4xl animate-heart-float z-20"
          style={{
            left: heart.x,
            top: heart.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          💕
        </div>
      ))}

      {/* Плачущие смайлики */}
      {cryingEmojis.map((crying) => (
        <div
          key={crying.id}
          className="absolute pointer-events-none text-4xl animate-crying-fall z-20"
          style={{
            left: crying.x,
            top: crying.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          😭
        </div>
      ))}
    </>
  );
};

export default FireworksEffect;
