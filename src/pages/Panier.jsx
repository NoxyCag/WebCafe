import { useCart } from "../contexts/CartContext";
import { useEffect, useState } from "react";
import { fetchDosettesAvecFiltres } from "../services/api";

export default function Panier() {
  const { panier, quantite, setPanier } = useCart();
  const [dosettes, setDosettes] = useState([]);
  const [erreur, setErreur] = useState(null);

  // Charger toutes les dosettes depuis l'API
  useEffect(() => {
    fetchDosettesAvecFiltres()
      .then(setDosettes)
      .catch(() => setErreur("Impossible de charger les dosettes."));
  }, []);

  // Filtrer seulement celles qui sont dans le panier
  const dosettesPanier = dosettes.filter((d) => panier[d.id]);

  // Calcul du total
  const total = dosettesPanier.reduce((somme, d) => {
    return somme + d.prix * quantite(d.id);
  }, 0);

  // Action pour payer et vider le panier
  const handlePayer = () => {
    alert("Merci pour votre achat ☕ !");
    setPanier({});
  };

  if (erreur) return <p style={{ color: "red" }}>{erreur}</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ color: "var(--accent-color)" }}>Votre Panier</h1>

      {dosettesPanier.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "0.5rem" }}>Nom</th>
                <th style={{ textAlign: "center" }}>Quantité</th>
                <th style={{ textAlign: "center" }}>Prix unitaire</th>
                <th style={{ textAlign: "center" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {dosettesPanier.map((d) => (
                <tr key={d.id}>
                  <td style={{ padding: "0.5rem" }}>{d.nom}</td>
                  <td style={{ textAlign: "center" }}>{quantite(d.id)}</td>
                  <td style={{ textAlign: "center" }}>{Number(d.prix).toFixed(2)} €</td>
                  <td style={{ textAlign: "center" }}>
                    {(d.prix * quantite(d.id)).toFixed(2)} €
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 style={{ textAlign: "right", marginTop: "1.5rem", color: "var(--accent-color)" }}>
            Total : {total.toFixed(2)} €
          </h2>

          <div style={{ textAlign: "right", marginTop: "1rem" }}>
            <button onClick={handlePayer}>Payer</button>
          </div>
        </>
      )}
    </div>
  );
}
