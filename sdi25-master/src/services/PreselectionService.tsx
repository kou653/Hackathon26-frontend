/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";

const apiUrl = "/api";

export const handleServiceGetCurrentQuiz = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/preselection/render`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      return [];
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateQuestion = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/question/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Question ajouée au quiz avec succès");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateAnswer = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/response/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Réponse ajouée à la question");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteAnswer = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/response/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Réponse supprimée avec succès");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteQuestion = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/question/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceUpdateQuestion = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/question/update`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceChangeQuizState = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/quiz/toogle`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Le statut du quiz pour a bien été changé");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceQualifyTeam = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/equipe/toogle`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceQualifyAutomaticallyTeams = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/api/groupe/autoselect`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceOpenSessionQuizTeam = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/quiz/reset`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};