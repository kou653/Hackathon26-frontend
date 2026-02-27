import {
  handleServiceGetMeal,
  handleServiceCommand,
  handleServiceParticipantGetData,
} from "../../../services/restaurantService.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import SelectUi from "../../../components/ui/SelectUi.tsx";
import { notify } from "../../../components/toast/toast.tsx";
import React, { useEffect, useState } from "react";
import secureLocalStorage from "react-secure-storage";

export default function Restauration() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [data, setData] = useState({});

  const [roomValue, setRoomValue] = useState("");

  const [listRepas, setListRepas] = useState([]);
  const [repasValue, setRepasValue] = useState("");
  const handleRepasChange = (selectedOption) => {
    setRepasValue(selectedOption?.value ?? "");
  };

  const [listCollation, setListCollation] = useState([]);
  const [collationValue, setCollationValue] = useState("");
  const handleCollationChange = (selectedOption) => {
    setCollationValue(selectedOption?.value ?? "");
  };

  const [listSalles, setListSalles] = useState([]);
  const handleSalleChange = (selectedOption) => {
    setRoomValue(selectedOption?.value ?? "");
  };

  const getOrderLabel = (payload) => {
    const repasLabel =
      payload?.commande?.repas?.libelle ?? payload?.repas?.libelle ?? "";
    const collationLabel =
      payload?.commande?.collation?.libelle ?? payload?.collation?.libelle ?? "";

    if (repasLabel && collationLabel) return `${repasLabel} + ${collationLabel}`;
    if (repasLabel) return repasLabel;
    if (collationLabel) return collationLabel;
    return "commande enregistree";
  };

  const resolveParticipantName = () => {
    const rawUser = secureLocalStorage.getItem("user");
    const decodedUser = rawUser?.etudiant ?? rawUser ?? {};
    const nom = (decodedUser?.nom ?? "").trim();
    return nom || "Participant";
  };

  const resolveTeamName = () => {
    const decodedTeam = secureLocalStorage.getItem("team");
    const rawUser = secureLocalStorage.getItem("user");
    const decodedUser = rawUser?.etudiant ?? rawUser ?? {};
    const participantFromData = data?.participant ?? data?.etudiant ?? data?.user ?? {};

    return (
      decodedTeam?.find?.((element) => element?.chef === 1)?.groupe?.nom ??
      decodedTeam?.find?.((element) => element?.equipe?.nom)?.equipe?.nom ??
      decodedTeam?.[0]?.groupe?.nom ??
      decodedTeam?.[0]?.equipe?.nom ??
      decodedUser?.groupe?.nom ??
      decodedUser?.equipe?.nom ??
      participantFromData?.groupe?.nom ??
      participantFromData?.equipe?.nom ??
      data?.equipe?.nom ??
      data?.team?.nom ??
      (typeof data?.equipe === "string" ? data.equipe : "") ??
      (typeof data?.team === "string" ? data.team : "") ??
      "Equipe non definie"
    );
  };

  const resolveRoomValue = () => {
    if (String(roomValue ?? "").trim()) return roomValue;

    const roomFromData =
      data?.salle?.id ??
      data?.room?.id ??
      data?.participant?.salle?.id ??
      data?.participant?.room?.id ??
      data?.salle?.libelle ??
      data?.room?.libelle ??
      data?.participant?.salle?.libelle ??
      data?.participant?.room?.libelle ??
      data?.salle ??
      data?.room;

    if (String(roomFromData ?? "").trim()) return roomFromData;

    if (Array.isArray(listSalles) && listSalles.length === 1) {
      return listSalles[0]?.value ?? "";
    }

    return "";
  };

  const handleCommand = async () => {
    const participantName = resolveParticipantName();
    const teamName = resolveTeamName();
    const selectedRoomValue = resolveRoomValue();

    if (!String(selectedRoomValue ?? "").trim()) {
      notify("error", "Veuillez choisir votre salle");
      return;
    }

    if (!repasValue && !collationValue) {
      notify("error", "Choisissez au moins un repas ou une collation");
      return;
    }

    setIsLoading(true);
    const repasId = repasValue ? Number(repasValue) : null;
    const collationId = collationValue ? Number(collationValue) : null;

    const salle =
      typeof selectedRoomValue === "number" || /^\d+$/.test(String(selectedRoomValue))
        ? Number(selectedRoomValue)
        : String(selectedRoomValue).trim();

    const payload = {
      nom: participantName.trim(),
      equipe: teamName.trim(),
      salle,
    };
    if (repasId) {
      payload.repasId = repasId;
      payload.repas_id = repasId;
    }
    if (collationId) {
      payload.collationId = collationId;
      payload.collation_id = collationId;
    }

    const ok = await handleServiceCommand(payload);
    if (ok) {
      setRepasValue("");
      setCollationValue("");
      await getData();
    }
    setIsLoading(false);
  };

  async function getData() {
    setIsLoading(true);

    const result = await handleServiceParticipantGetData();
    if (!result) {
      setIsLoading(false);
      return;
    }

    if (Array.isArray(result.repas)) {
      const tempRepas = result.repas.map((item) => ({
        value: item.id,
        label: item.libelle,
      }));
      setListRepas(tempRepas);
    } else {
      setListRepas([]);
    }

    if (Array.isArray(result.collations)) {
      const tempCollation = result.collations.map((item) => ({
        value: item.id,
        label: item.libelle,
      }));
      setListCollation(tempCollation);
    } else {
      setListCollation([]);
    }

    if (Array.isArray(result.salles)) {
      const tempSalles = result.salles.map((item) => ({
        value: item.id ?? item.libelle,
        label: item.libelle ?? String(item.id),
      }));
      setListSalles(tempSalles);
    } else {
      setListSalles([]);
    }

    // Si le backend ne renvoie plus repas/collations apres une premiere commande,
    // on recharge le menu global pour permettre la commande multiple.
    if (!Array.isArray(result.repas) || !Array.isArray(result.collations)) {
      const mealData = await handleServiceGetMeal();
      if (Array.isArray(mealData?.repas)) {
        setListRepas(
          mealData.repas.map((item) => ({
            value: item.id,
            label: item.libelle,
          }))
        );
      }
      if (Array.isArray(mealData?.collations)) {
        setListCollation(
          mealData.collations.map((item) => ({
            value: item.id,
            label: item.libelle,
          }))
        );
      }
    }

    if (result.commande || result.collation || result.repasCommande) {
      setOrder({
        commande: result.commande,
        collation: result.collation,
        repas: result.repasCommande,
      });
    } else {
      setOrder({});
    }

    setData(result);
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (!String(roomValue ?? "").trim() && Array.isArray(listSalles) && listSalles.length === 1) {
      setRoomValue(listSalles[0]?.value ?? "");
    }
  }, [listSalles, roomValue]);

  return (
    <div className="max-w-xl mx-auto md:py-24 py-4 px-4">
      {!isLoading ? (
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="font-bold text-xl text-center my-6 text-[#F94C10]">
            Commandez votre restauration
          </h1>
          <div className="w-full max-w-xl">
            <div className="flex flex-col gap-4">
              {listSalles.length > 0 ? (
                <div className="w-full">
                  <SelectUi
                    placeholder="Choisissez votre salle"
                    options={listSalles}
                    filterValue={roomValue}
                    onChange={handleSalleChange}
                  />
                </div>
              ) : (
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3"
                  placeholder="Salle"
                  value={roomValue}
                  onChange={(event) => setRoomValue(event.target.value)}
                />
              )}

              {listRepas.length !== 0 ? (
                <div className="w-full">
                  <SelectUi
                    placeholder="Choisissez un repas"
                    options={listRepas}
                    filterValue={repasValue}
                    onChange={handleRepasChange}
                  />
                </div>
              ) : null}
              {listCollation.length !== 0 ? (
                <div className="w-full">
                  <SelectUi
                    placeholder="Choisissez une collation"
                    options={listCollation}
                    filterValue={collationValue}
                    onChange={handleCollationChange}
                  />
                </div>
              ) : null}
              {listCollation.length !== 0 || listRepas.length !== 0 ? (
                <div className="mt-2">
                  <Button
                    label="Commander"
                    onClick={() => handleCommand()}
                    isDisable={false}
                    isLoading={isLoading}
                    isReady={true}
                  />
                </div>
              ) : null}
            </div>
          </div>
          {data.hasOrdered ? (
            <div className="text-sm text-gray-600">
              Derniere commande: {getOrderLabel(order)}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
