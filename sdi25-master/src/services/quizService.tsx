import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetQuiz = async (data: object) => {
  try {
    const response = await api.post("/quiz/render", data);
    return response.data.status ? response.data.questions : [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};

export const handleServiceGetQuizState = async () => {
  try {
    const response = await api.post("/quiz/state");

    if (response.data.status) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    notify("error", "Erreur serveur");
    return null;
  }
};

export const handleServiceSendQuizScore = async (data: object) => {
  try {
    const response = await api.post("/quiz/submit", data);

    if (response.data.status) {
      notify("success", "Vos réponses ont bien été envoyées");
      return true;
    }

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceGetRandomQuiz = async (data: object) => {
  try {
    const response = await api.post("/game/question", data);
    return response.data.status ? response.data.data : [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};

export const handleServiceSendAnswer = async (data: object) => {
  try {
    const response = await api.post("/game/validate", data);

    if (response.data.status) {
      notify("success", "Votre réponse a bien été soumise");
      return true;
    }

    notify("error", response.data.message);
    return false;
  } catch (error) {
    notify("error", "Erreur serveur");
    return false;
  }
};

export const handleServiceGetRankList = async () => {
  try {
    const response = await api.get("/game/joueurs/render");
    return response.data.status ? response.data.data : [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};
