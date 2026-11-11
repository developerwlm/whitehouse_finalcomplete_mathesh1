// Textarea based editor for string arrays: one item per line.
export default function ArrayField({ label, value, onChange, hint, rows = 4 }) {
  const text = Array.isArray(value) ? value.join("\n") : "";

  const handleChange = (event) => {
    const items = event.target.value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    onChange(items);
  };

  return (
    <div className="field">
      <label className="field-label">{label}</label>
      <textarea
        className="input textarea"
        rows={rows}
        value={text}
        placeholder="One item per line"
        onChange={handleChange}
      />
      <p className="field-hint">{hint || "Enter one item per line."}</p>
    </div>
  );
}
