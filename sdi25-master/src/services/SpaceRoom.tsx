import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetRooms = async () => {
  try {
    const response = await api.get("/salle/render");

    if (response.data?.status === true) {
      notify("success", "Liste mise à jour");
      return response.data.data?.salles ?? [];
    }

    notify("error", response.data?.message ?? "Erreur serveur");
    return [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};

export const handleServiceCreateClass = async (data: object) => {
  try {
    const response = await api.post("/salle/create", data);

    if (response.data?.status === true) {
      notify("success", "Salle créée avec succès");
      return true;
    }

    notify("error", response.data?.message ?? "Erreur serveur");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceUpdateSpace = async (data: object) => {
  try {
    const response = await api.post("/salle/update", data);

    if (response.data?.status === true) {
      notify("success", "Salle mise à jour");
      return true;
    }

    notify("error", response.data?.message ?? "Erreur serveur");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceDeleteSpace = async (data: object) => {
  try {
    const response = await api.post("/salle/delete", data);

    if (response.data?.status === true) {
      notify("success", "Salle supprimée");
      return true;
    }

    notify("error", response.data?.message ?? "Erreur serveur");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};
