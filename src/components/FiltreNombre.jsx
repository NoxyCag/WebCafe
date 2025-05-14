export default function FiltreNombre({ label, id, value, setValue, min = 0, max, step = 1 }) {
    return (
      <div className="filtre-section">
        <label htmlFor={id}>{label}</label>
        <input
          type="number"
          id={id}
          value={value}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (val >= min || e.target.value === "") {
              setValue(e.target.value);
            }
          }}
          min={min}
          max={max}
          step={step}
        />
      </div>
    );
  }