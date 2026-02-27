import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetMeal = async () => {
  try {
    const response = await api.get("/restauration/render");
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

export const handleServiceCreateFood = async (data: any) => {
  try {
    const response = await api.post("/repas/create", data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Le repas a bien été crée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCreateDrink = async (data: any) => {
  try {
    const response = await api.post("/collation/create", data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "La collation a bien été crée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteFood = async (data: any) => {
  try {
    const response = await api.post("/repas/delete", data);
    const status = response.data.status;
  
    switch (status) {
    case true:
      notify("success", "Le repas a bien été supprimé");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceDeleteCollation = async (data: any) => {
  try {
    const response = await api.post("/collation/delete", data);
    const status = response.data.status;
  
    switch (status) {
    case true:
      notify("success", "La collation a bien été supprimée");
      return true;
    case false:
      notify("error", response.data.message);
      break;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceGetcommand = async () => {
  try {
    const response = await api.get("/commandes/render");
    const status = response.data.status;

    switch (status) {
    case true:
      return (
        response.data?.data?.commandes ??
        response.data?.data?.orders ??
        response.data?.data ??
        []
      );
    case false:
      return [];
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceResetcommand = async () => {
  try {
    const response = await api.get("/commandes/reset");
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "les commandes on bien été supprimées");
      return true;
    case false:
      notify("error", response.data.message || "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceParticipantGetData = async () => {
  try {
    const response = await api.get("/prestauration/render");
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", response.data.message || "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceCommand = async (data: object) => {
  try {
    const response = await api.post("/commande/make", data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre commande a bien été enregistée");
      return true;
    case false:
      notify("error", response.data.message || "Quelque chose a mal tourné");
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceScanCode = async (data: object) => {
  try {
    const response = await api.post("/restauration/soumission", data);
    const status = response.data.status;

    switch (status) {
    case true:
      notify("success", "Votre ticket a bien été scanné");
      return true;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

export const handleServiceAllRepas= async () => {
  try {
    const response = await api.get("/allrepas/render");
    const status = response.data.status;

    switch (status) {
    case true:
      return response.data.data;
    case false:
      notify("error", response.data.message);
      return false;
    }
  } catch (error) {
    notify("error", "Une erreur s'est produite !");
  }
};

