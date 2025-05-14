import { useEffect, useState } from "react";
import { fetchDosettesAvecFiltres } from "../services/api";
import { useNavigate } from "react-router-dom";
import DosetteCardAdmin from "../components/DosetteCardAdmin";
import Filtres from "../components/Filtres";

export default function Admin() {
  const [dosettes, setDosettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState(null);
  
  const navigate = useNavigate();

  const handleNouveau = () => {
    navigate(`/admin/nouveau`);
  };

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
    chargerDosettes();
  }, []);

  return (
    <div style={{ display: "flex", padding: "2rem" }}>
      <div style={{ width: "250px", marginRight: "2rem" }}>
        <Filtres onFiltrer={chargerDosettes} />
        <button onClick={handleNouveau} style={{ marginTop: "1rem"}}>Créer une nouvelle dosette de café</button>
      </div>
      <div style={{ flex: 1 }}>
        <h1>Nos Dosettes de Café</h1>
        

        {loading && <p>Chargement...</p>}
        {erreur && <p>{erreur}</p>}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
        {dosettes.map(d => (
            <DosetteCardAdmin
              key={d.id}
              id={d.id}
              nom={d.nom}
              intensite={d.intensite}
              prix={d.prix}
              marque={d.marque_nom ?? "Inconnue"}
              pays={d.pays_nom ?? "Inconnu"}
              onDelete={(idSupprime) =>
                setDosettes((prev) => prev.filter((d) => d.id !== idSupprime))
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
