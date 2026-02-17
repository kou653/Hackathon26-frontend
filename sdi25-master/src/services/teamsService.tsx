import { notify } from "../components/toast/toast.tsx";
import api from "./axios";

export const handleServiceGetTeams = async (data: object) => {
  try {
    const response = await api.post("/groupe/render", data);

    if (response.data?.status === true) {
      notify("success", "Liste mise à jour");
      return response.data.data?.equipes ?? [];
    }

    notify("error", response.data?.message ?? "Erreur serveur");
    return [];
  } catch (error) {
    notify("error", "Erreur serveur");
    return [];
  }
};
