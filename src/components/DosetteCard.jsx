import { useCart } from "../contexts/CartContext";
import "../styles/DosetteCard.css";

export default function DosetteCard({ id, nom, intensite, prix, marque, pays }) {
  const { ajouter, retirer, quantite } = useCart();
  const qte = quantite(id);

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
        <button onClick={() => ajouter(id)}>Ajouter au panier</button>
        {qte > 0 && (
          <>
            <span>{qte}</span>
            <button onClick={() => retirer(id)}>-</button>
          </>
        )}
      </div>
    </div>
  );
}
