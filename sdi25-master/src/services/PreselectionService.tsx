import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetCurrentQuiz = async (data: object) => {
  try {
    const response = await api.post("/preselection/render", data);
    return response.data.status ? response.data.data : [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};

export const handleServiceCreateQuestion = async (data: object) => {
  try {
    const response = await api.post("/question/create", data);
    if (response.data.status) {
      notify("success", "Question ajoutée avec succès");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceCreateAnswer = async (data: object) => {
  try {
    const response = await api.post("/response/create", data);
    if (response.data.status) {
      notify("success", "Réponse ajoutée");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceDeleteAnswer = async (data: object) => {
  try {
    const response = await api.post("/response/delete", data);
    if (response.data.status) {
      notify("success", "Réponse supprimée");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceDeleteQuestion = async (data: object) => {
  try {
    const response = await api.post("/question/delete", data);
    if (response.data.status) return true;

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceUpdateQuestion = async (data: object) => {
  try {
    const response = await api.post("/question/update", data);
    if (response.data.status) return true;

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceChangeQuizState = async (data: object) => {
  try {
    const response = await api.post("/quiz/toogle", data);
    if (response.data.status) {
      notify("success", "Statut du quiz modifié");
      return true;
    }
    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceQualifyTeam = async (data: object) => {
  try {
    const response = await api.post("/equipe/toogle", data);
    if (response.data.status) return true;

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceQualifyAutomaticallyTeams = async (data: object) => {
  try {
    const response = await api.post("/groupe/autoselect", data);
    if (response.data.status) return true;

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceOpenSessionQuizTeam = async (data: object) => {
  try {
    const response = await api.post("/quiz/reset", data);
    if (response.data.status) return true;

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};
