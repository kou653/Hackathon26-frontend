/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetQuiz = async (data: object) => {
  try {
    const response = await api.post("/quiz/render", data);

    if (response.data.status === true) {
      return response.data.questions;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};

export const handleServiceGetQuizState = async () => {
  try {
    const response = await api.post("/quiz/state");

    if (response.data.status === true) {
      return response.data.data;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};

export const handleServiceSendQuizScore = async (data: object) => {
  try {
    const response = await api.post("/quiz/submit", data);

    if (response.data.status === true) {
      notify("success", "Vos réponses ont bien été envoyées");
      return true;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};

export const handleServiceGetRandomQuiz = async (data: object) => {
  try {
    const response = await api.post("/game/question", data);

    if (response.data.status === true) {
      return response.data.data;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};

export const handleServiceSendAnswer = async (data: object) => {
  try {
    const response = await api.post("/game/validate", data);

    if (response.data.status === true) {
      notify("success", "Votre réponse a bien été soumise");
      return true;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};

export const handleServiceGetRankList = async () => {
  try {
    const response = await api.get("/game/joueurs/render");

    if (response.data.status === true) {
      return response.data.data;
    } else {
      notify("error", "Une erreur s'est produite !");
    }
  } catch (error) {
    notify("error", "Erreur serveur");
  }
};
