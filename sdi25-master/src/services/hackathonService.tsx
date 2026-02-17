import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetHackathonList = async () => {
  try {
    const response = await api.get("/hackathon/render");
    return response.data.status ? response.data.data : [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};

export const handleServiceToggleHackathon = async (data: object) => {
  try {
    const response = await api.post("/hackathon/tooglestate", data);
    if (response.data.status) {
      notify("success", "Statut de l'hackathon modifié");
      return true;
    }
    notify("error", "Une erreur s'est produite !");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceCreateHackathon = async (data: object) => {
  try {
    const response = await api.post("/hackathon/create", data);
    if (response.data.status) {
      notify("success", "Hackathon créé avec succès");
      return true;
    }
    notify("error", "Une erreur s'est produite !");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceCreateClass = async (data: object) => {
  try {
    const response = await api.post("/classe/create", data);
    if (response.data.status) {
      notify("success", "Classe créée avec succès");
      return true;
    }
    notify("error", "Une erreur s'est produite !");
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceUpdateClass = async (data: object) => {
  try {
    const response = await api.post("/classe/update", data);
    if (response.data.status) {
      notify("success", "Classe mise à jour");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceDeleteClass = async (data: object) => {
  try {
    const response = await api.post("/classe/delete", data);
    if (response.data.status) {
      notify("success", "Classe supprimée");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};
