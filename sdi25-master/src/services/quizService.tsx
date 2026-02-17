/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";
import api from "./axios";

// Fonction utilitaire pour ajouter le token aux headers
const getAuthHeader = () => {
  const token = secureLocalStorage.getItem("session_token");
  return token ? { Authorization: "Bearer " + token } : {};
};

// ------------------- Quiz -------------------

export const handleServiceGetQuiz = async (data: object) => {
  try {
    const response = await api.post("/quiz/render", data, {
      headers: getAuthHeader(),
    });

    if (response.data.status) return response.data.questions;
    notify("error", "Une erreur s'est produite !");
    return null;
  } catch (error) {
    console.error(error);
    notify("error", "Erreur serveur !");
    return null;
  }
};

export const handleServiceGetQuizState = async () => {
  try {
    const response = await api.post("/quiz/state", {}, {
      headers: getAuthHeader(),
    });

    if (response.data.status) return response.data.data;
    notify("error", "Une erreur s'est produite !");
    return null;
  } catch (error) {
    console.error(error);
    notify("error", "Impossible de récupérer l'état du quiz !");
    return null;
  }
};

export const handleServiceSendQuizScore = async (data: object) => {
  try {
    const response = await api.post("/quiz/submit", data, {
      headers: getAuthHeader(),
    });

    if (response.data.status) {
      notify("success", "Vos réponses ont bien été envoyées");
      return true;
    }
    notify("error", "Une erreur s'est produite !");
    return false;
  } catch (error) {
    console.error(error);
    notify("error", "Erreur serveur !");
    return false;
  }
};

// ------------------- Game -------------------

export const handleServiceGetRandomQuiz = async (data: object) => {
  try {
    const response = await api.post("/game/question", data, {
      headers: getAuthHeader(),
    });

    if (response.data.status) return response.data.data;
    notify("error", "Une erreur s'est produite !");
    return null;
  } catch (error) {
    console.error(error);
    notify("error", "Erreur serveur !");
    return null;
  }
};

export const handleServiceSendAnswer = async (data: object) => {
  try {
    const response = await api.post("/game/validate", data, {
      headers: getAuthHeader(),
    });

    if (response.data.status) {
      notify("success", "Votre réponse a bien été soumise");
      return true;
    }
    notify("error", "Une erreur s'est produite !");
    return false;
  } catch (error) {
    console.error(error);
    notify("error", "Erreur serveur !");
    return false;
  }
};

export const handleServiceGetRankList = async () => {
  try {
    const response = await api.get("/game/joueurs/render", {
      headers: getAuthHeader(),
    });

    if (response.data.status) return response.data.data;
    notify("error", "Une erreur s'est produite !");
    return [];
  } catch (error) {
    console.error(error);
    notify("error", "Erreur serveur !");
    return [];
  }
};
