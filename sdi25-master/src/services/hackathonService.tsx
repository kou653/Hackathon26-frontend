/* eslint-disable @typescript-eslint/no-non-null-assertion */
import axios from "axios";
import { notify } from "../components/toast/toast.tsx";
import secureLocalStorage from "react-secure-storage";

const apiUrl = process.env.REACT_APP_API_URL;

export const handleServiceGetHackathonList = async () => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/hackathon/render`;
    const response = await axios.get(uri);
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceToggleHackathon = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/hackathon/tooglestate`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Statut de l'hackathon modifié");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      return false;
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateHackathon = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/hackathon/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Un hackathon a bien été crée");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateClass = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/classe/create`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Une classe a bien été créee");
      return true;
    case false:
      notify("error", "Une erreur s'est produite !");
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceUpdateClass = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/classe/update`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La classe a bien été mise à jour");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};

export const handleServiceDeleteClass = async (data: object) => {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + secureLocalStorage.getItem("session_token")!;

  try {
    const uri = `${apiUrl}/classe/delete`;
    const response = await axios.post(uri, data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La classe a bien été supprimée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite");
  }
};
