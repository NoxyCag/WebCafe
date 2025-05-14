import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMarques, fetchPays } from "../services/api";
import "../styles/FormulaireDosette.css";

export default function FormulaireDosette({ initialData = {}, onSubmit }) {
  const navigate = useNavigate();

  const [nom, setNom] = useState(initialData.nom || "");
  const [intensite, setIntensite] = useState(initialData.intensite || "");
  const [prix, setPrix] = useState(initialData.prix || "");
  const [marqueNom, setMarqueNom] = useState(initialData.nom_marque || "");
  const [paysNom, setPaysNom] = useState(initialData.nom_pays || "");

  const [marques, setMarques] = useState([]);
  const [paysList, setPaysList] = useState([]);

  useEffect(() => {
    fetchMarques().then(setMarques);
    fetchPays().then(setPaysList);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
        nom,
        intensite,
        prix,
        nom_marque: marqueNom,
        nom_pays: paysNom,
    });
  };

  return (
    <div className="formulaire-dosette">
      <h2 style={{ textAlign: "center", color: "var(--accent-color)" }}>Formulaire Dosette</h2>

      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} required />

        <label>Intensité</label>
        <input type="number" value={intensite} onChange={(e) => setIntensite(e.target.value)} min={0} max={10} required />

        <label>Prix (€)</label>
        <input type="number" step="0.01" value={prix} onChange={(e) => setPrix(e.target.value)} required />

        <label>Marque</label>
        <select value={marqueNom} onChange={(e) => setMarqueNom(e.target.value)} required>
        {!marqueNom && <option value="">-- Choisir --</option>}
        {marques.map((m) => (
            <option key={m.id} value={m.nom}>
            {m.nom}
            </option>
        ))}
        </select>

        <label>Pays</label>
        <select value={paysNom} onChange={(e) => setPaysNom(e.target.value)} required>
        {!paysNom && <option value="">-- Choisir --</option>}
        {paysList.map((p) => (
            <option key={p.id} value={p.nom}>
            {p.nom}
            </option>
        ))}
        </select>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button type="submit">Valider</button>
          <button type="button" onClick={() => navigate("/admin")} style={{ backgroundColor: "#b58a7d" }}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
