import api from "./axios";
import { notify } from "../components/toast/toast.tsx";

export const handleServiceGetLevelsList = async (data: object) => {
  try {
    const response = await api.post(
      "/data-for-enregistrement-participants",
      data
    );

    console.log("🔵 Réponse complète:", response);

    if (response.data.status === true) {
      return response.data.data;
    }

    notify("error", "Une erreur s'est produite !");
    return null;

  } catch (error) {
    console.error("❌ API error:", error);
    notify("error", "Erreur serveur !");
    return null;
  }
};

export const handleServiceGetClassList = async () => {
  try {
    const response = await api.get("/classe/render");

    if (response.data.status === true) {
      return response.data.data;
    }

    notify("error", "Une erreur s'est produite !");
    return null;

  } catch (error) {
    console.error("❌ API error:", error);
    notify("error", "Erreur serveur !");
    return null;
  }
};
