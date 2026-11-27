
"use client";

const keys = [
  { label: "W", image: "/assets/ui/key-w.png" },
  { label: "A", image: "/assets/ui/key-a.png" },
  { label: "S", image: "/assets/ui/key-s.png" },
  { label: "D", image: "/assets/ui/key-d.png" },
];

export default function KeyboardControls() {
  return (
    <div className="keyboard-panel">
      <p className="panel-label">HOW TO EXPLORE</p>

      <div className="wasd-keys">
        <img src={keys[0].image} alt="W key" />
        <div>
          {keys.slice(1).map((key) => (
            <img key={key.label} src={key.image} alt={`${key.label} key`} />
          ))}
        </div>
      </div>

      <div className="action-keys">
        <img src="/assets/ui/key-arrows.png" alt="Arrow keys" />
        <img src="/assets/ui/key-enter.png" alt="Enter key" />
        <img src="/assets/ui/key-esc.png" alt="Escape key" />
      </div>

      <p className="control-caption">
        MOVE <span>·</span> INTERACT <span>·</span> BACK
      </p>
    </div>
  );
}