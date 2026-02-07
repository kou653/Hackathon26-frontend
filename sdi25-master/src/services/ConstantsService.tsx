/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

// console.log("API =", process.env.REACT_APP_API_URL);
const apiUrl = process.env.REACT_APP_API_URL + "/api";

export const handleServiceGetLevelsList = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;
    

  try {
    const uri = `${apiUrl}/data-for-enregistrement-participants`;
    
    const response = await axios.post(uri, data);
    
    console.log("🔵 Réponse complète de l'API:", response);
    console.log("🔵 response.data:", response.data);
    
    const status = response.data.status;

    switch (status) {
      case true:
        console.log("✅ Données reçues:", response.data.data);
        return response.data.data; // ✅ RETURN est important ici
      case false:
        notify("error", "Une erreur s'est produite !");
        return null; // ✅ Retourner null au lieu de rien
      default:
        notify("error", "Réponse inattendue du serveur !");
        return null; // ✅ Retourner null
    }
  } catch (error) {
    console.error("❌ Erreur API getLevelsList:", error);
    notify("error", "Une erreur s'est produite !");
    return null; // ✅ Retourner null en cas d'erreur
  }
};

export const handleServiceGetClassList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/classe/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
      case true:
        return response.data.data; // ✅ RETURN
      case false:
        notify("error", "Une erreur s'est produite !");
        return null; // ✅ RETURN
      default:
        notify("error", "Réponse inattendue du serveur !");
        return null; // ✅ RETURN
    }
  } catch (error) {
    console.error("❌ Erreur API getClassList:", error);
    notify("error", "Une erreur s'est produite !");
    return null; // ✅ RETURN
  }
};