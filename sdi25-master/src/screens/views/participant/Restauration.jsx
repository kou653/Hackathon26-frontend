import {
  handleServiceCommand,
  handleServiceParticipantGetData,
} from "../../../services/restaurantService.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import SelectUi from "../../../components/ui/SelectUi.tsx";
import { notify } from "../../../components/toast/toast.tsx";
import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

export default function Restauration() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({});
  const [data, setData] = useState({});

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

  const getHasScannedTicket = (payload) => {
    if (typeof payload?.hasScanned === "boolean") return payload.hasScanned;
    if (typeof payload?.ticketScanned === "boolean") return payload.ticketScanned;
    if (typeof payload?.isScanned === "boolean") return payload.isScanned;
    if (typeof payload?.isRead === "boolean") return payload.isRead;
    return true;
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
    const canOrder = getHasScannedTicket(data);
    if (!canOrder) {
      notify("error", "Faites d'abord scanner votre QR code par un administrateur");
      return;
    }

    if (!repasValue && !collationValue) {
      notify("error", "Choisissez au moins un repas ou une collation");
      return;
    }

    setIsLoading(true);
    const payload = {};
    if (repasValue) payload.repasId = repasValue;
    if (collationValue) payload.collationId = collationValue;

    await handleServiceCommand(payload);
    await getData();
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
          <h1 className="font-bold text-xl text-center text-[#F94C10]">
            Votre Code Qr
          </h1>
          <QRCode value={data.qrcodeValue || ""} />
          {!getHasScannedTicket(data) ? (
            <p className="text-sm text-center text-gray-600">
              Votre QR code doit etre scanne par un administrateur avant la commande.
            </p>
          ) : null}

          <h1 className="font-bold text-xl text-center my-6 text-[#F94C10]">
            Commandez votre restauration
          </h1>
          {!data.hasOrdered ? (
            <div className="w-full">
              <center>
                {listRepas.length !== 0 ? (
                  <div className="mb-4 w-full">
                    <SelectUi
                      placeholder="Choisissez un repas"
                      options={listRepas}
                      filterValue={repasValue}
                      onChange={handleRepasChange}
                    />
                  </div>
                ) : null}
                {listCollation.length !== 0 ? (
                  <SelectUi
                    placeholder="Choisissez une collation"
                    options={listCollation}
                    filterValue={collationValue}
                    onChange={handleCollationChange}
                  />
                ) : null}
                {listCollation.length !== 0 || listRepas.length !== 0 ? (
                  <div className="mt-6">
                    <Button
                      label="Commander"
                      onClick={() => handleCommand()}
                      isDisable={!getHasScannedTicket(data)}
                      isLoading={isLoading}
                      isReady={true}
                    />
                  </div>
                ) : null}
              </center>
            </div>
          ) : (
            <div>Vous avez commande: {getOrderLabel(order)}</div>
          )}
        </div>
      ) : null}
    </div>
  );
}
