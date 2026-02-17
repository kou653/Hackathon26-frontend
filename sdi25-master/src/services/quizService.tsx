/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = "/api";

export const handleServiceGetQuiz = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/quiz/render`;

    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.questions;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetQuizState = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/quiz/state`;

    const response = await axios.post(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceSendQuizScore = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/quiz/submit`;

    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Vos réponses ont bien été envoyées");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetRandomQuiz = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/game/question`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceSendAnswer = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/game/validate`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre réponse a bien été soumise");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetRankList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/game/joueurs/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};