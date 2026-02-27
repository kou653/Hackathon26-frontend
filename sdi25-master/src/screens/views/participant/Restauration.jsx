import {
  handleServiceCommand,
  handleServiceParticipantGetData,
} from "../../../services/restaurantService.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import SelectUi from "../../../components/ui/SelectUi.tsx";
import { notify } from "../../../components/toast/toast.tsx";
import React, { useEffect, useState } from "react";

export default function Restauration() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [data, setData] = useState({});

  const [participantName, setParticipantName] = useState("");
  const [teamName, setTeamName] = useState("");
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

  const handleCommand = async () => {
    if (!participantName.trim() || !teamName.trim() || !String(roomValue).trim()) {
      notify("error", "Renseignez nom, equipe et salle");
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
      typeof roomValue === "number" || /^\d+$/.test(String(roomValue))
        ? Number(roomValue)
        : String(roomValue).trim();

    const payload = {
      nom: participantName.trim(),
      equipe: teamName.trim(),
      salle,
    };
    if (repasId) payload.repasId = repasId;
    if (collationId) payload.collationId = collationId;

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

  return (
    <div className="max-w-xl mx-auto md:py-24 py-4 px-4">
      {!isLoading ? (
        <div className="flex flex-col gap-6 items-center w-full">
          <h1 className="font-bold text-xl text-center my-6 text-[#F94C10]">
            Commandez votre restauration
          </h1>
          <div className="w-full max-w-xl">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Votre nom complet"
                value={participantName}
                onChange={(event) => setParticipantName(event.target.value)}
              />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
                placeholder="Nom de votre equipe"
                value={teamName}
                onChange={(event) => setTeamName(event.target.value)}
              />
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
