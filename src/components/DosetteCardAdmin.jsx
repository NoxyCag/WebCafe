import "../styles/DosetteCard.css";
import { useNavigate } from "react-router-dom";
import { deleteDosette } from "../services/api";

export default function DosetteCardAdmin({ id, nom, intensite, prix, marque, pays, onDelete }) {
  
  const navigate = useNavigate();

  const handleModifier = () => {
    navigate(`/admin/modifier/${id}`);
  };

  const handleSupprimer = async () => {
    const confirmer = window.confirm("Êtes-vous sûr de vouloir supprimer cette dosette ?");
    if (!confirmer) return;

    try {
      await deleteDosette(id);
      onDelete(id); // notifie le parent
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Impossible de supprimer la dosette.");
    }
  };

  return (
    <div className="dosette-card">
      <h2>{nom}</h2>
      <p><strong>Marque :</strong> {marque}</p>
      <p><strong>Pays :</strong> {pays}</p>
      <div className="intensite-wrapper">
        <p><strong>Intensité :</strong> {intensite}/10</p>
        <div className="intensite-bar">
          <div
            className="intensite-remplie"
            style={{ width: `${(intensite / 10) * 100}%` }}
          ></div>
        </div>
      </div>
      <p><strong>Prix :</strong> {Number(prix).toFixed(2)} €</p>

      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
        <button onClick={handleModifier}>Modifier</button>
        <button onClick={handleSupprimer} style={{ backgroundColor: "#b58a7d" }}>Supprimer</button>
      </div>
    </div>
  );
}