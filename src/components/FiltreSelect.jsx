export default function FiltreSelect({ label, id, value, setValue, options, allLabel = "Tous" }) {
  return (
    <div className="filtre-section">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="">{allLabel}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.nom}>
            {opt.nom}
          </option>
        ))}
      </select>
    </div>
  );
}
  