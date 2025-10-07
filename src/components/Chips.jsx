export default function Chips({ items = [], active = 0, onSelect = () => {} }) {
  return (
    <div className="chips">
      {items.map((c, i) => (
        <button
          key={c}
          className={`chip ${i === active ? "chip--active" : ""}`}
          onClick={() => onSelect(i)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}
