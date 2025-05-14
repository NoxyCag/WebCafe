import { useEffect, useState } from "react";
import { fetchDosettesAvecFiltres } from "../services/api";
import DosetteCard from "../components/DosetteCard";
import Filtres from "../components/Filtres";

export default function Home() {
  const [dosettes, setDosettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);

  const chargerDosettes = (filtres = {}) => {
    setLoading(true);
    fetchDosettesAvecFiltres(filtres)
      .then(data => {
        setDosettes(data);
        setErreur(null);
      })
      .catch(error => {
        console.error(error);
        setErreur("Impossible de charger les dosettes.");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    chargerDosettes(); // chargement initial
  }, []);

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <div style={{ width: "250px", marginRight: "2rem" }}>
        <Filtres onFiltrer={chargerDosettes} />
      </div>
      <div style={{ flex: 1 }}>
        <h1>Nos Dosettes de Café</h1>
        {loading && <p>Chargement...</p>}
        {erreur && <p>{erreur}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
          {dosettes.map(d => (
            <DosetteCard
              key={d.id}
              id={d.id}
              nom={d.nom}
              intensite={d.intensite}
              prix={d.prix}
              marque={d.marque_nom ?? "Inconnue"}
              pays={d.pays_nom ?? "Inconnu"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
