import { CustomTabPanel, a11yProps } from "../../components/NavTabs";
import { PaginatedItems } from "../../components/PageIndicator";
import Button from "../../components/ui/ButtonUi.tsx";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { useEffect, useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {
  handleServiceAllRepas,
  handleServiceGetcommand,
  handleServiceResetcommand,
  handleServiceScanCode,
} from "../../services/restaurantService.tsx";

export default function RestaurantView() {
  const [value, setValue] = React.useState(0);
  const [commandList, setCommandList] = useState([]);
  const [allrepas, setAllRepas] = useState([]);
  const [nbEaters, setNbEaters] = useState(0);

  async function handleGetCommandList() {
    setIsLoading(true);
    const result = await handleServiceGetcommand();
    setCommandList(Array.isArray(result) ? result : []);
    setIsLoading(false);
  }

  async function handleGetAllRepas() {
    setIsLoading(true);
    const result = await handleServiceAllRepas();
    setAllRepas(Array.isArray(result?.repas) ? result.repas : []);
    setNbEaters(result?.nbEaters ?? 0);
    setIsLoading(false);
  }

  const handleResetCommandList = async () => {
    setIsLoading(true);
    const result = await handleServiceResetcommand();
    if (result) {
      handleGetCommandList();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setIsLoading(true);
      if (isMounted) {
        await handleGetCommandList();
        await handleGetAllRepas();
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TableHeader() {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          N
        </th>
        <th scope="col" className="px-6 py-3">
          Participant
        </th>
        <th scope="col" className="px-6 py-3">
          Repas
        </th>
        <th scope="col" className="px-6 py-3">
          Collation
        </th>
      </tr>
    );
  }

  function getParticipantLabel(item) {
    const participant = item?.participant ?? item?.etudiant ?? item?.user;
    if (!participant) return "Participant non defini";

    const nom = participant.nom ?? "";
    const prenom = participant.prenom ?? "";
    const fullName = `${nom} ${prenom}`.trim();
    return fullName || participant.matricule || "Participant non defini";
  }

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {index + 1}
              </th>
              <td className="px-6 py-4">{getParticipantLabel(item)}</td>
              <td className="px-6 py-4">{item?.repas?.libelle ?? "Repas non defini"}</td>
              <td className="px-6 py-4">
                {item?.collation?.libelle ?? "Collation non definie"}
              </td>
            </tr>
          ))}
      </>
    );
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [idTicket, setIdTicket] = useState("");

  const updateIsread = async () => {
    setIsLoading(true);
    const data = {
      qrcodeValue: idTicket,
    };
    setIsLoading(false);
    setIsRead(false);
    await handleServiceScanCode(data);
  };

  function makeReady(result) {
    setIsRead(true);
    setIdTicket(result);
  }

  return (
    <div className="md:p-9">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            scrollButtons={true}
            variant="scrollable"
            allowScrollButtonsMobile
          >
            <Tab label="Commandes" {...a11yProps(0)} />
            <Tab label="Restaurant" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div className="flex flex-col gap-6">
            <Button
              onClick={handleResetCommandList}
              label="Supprimer toutes les commandes"
              isDisable={false}
              isReady={true}
              isLoading={false}
            />
            {Array.isArray(commandList) && commandList.length !== 0 ? (
              <PaginatedItems
                itemsPerPage={4}
                item={commandList}
                Items={Items}
                tableHeader={TableHeader}
              />
            ) : (
              "Pas de commandes"
            )}
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="flex flex-col gap-9">
            <div className="text-left text-2xl font-bold">
              Scannez le code Qr sur le ticket
            </div>

            <div>
              {allrepas.map((element, index) => (
                <p className="font-bold" key={`${element.libelle}-${index}`}>
                  {element.libelle} :{" "}
                  <span className="text-[#F94C10]">
                    {element.nbEaten} / {nbEaters}
                  </span>
                </p>
              ))}
            </div>

            <QrScanner
              className="w-full"
              scanDelay={2000}
              key="environment"
              constraints={{
                facingMode: "environment",
              }}
              onDecode={(result) => makeReady(result)}
              onError={(error) => console.log(error?.message)}
            />

            {isRead ? (
              <Button
                onClick={() => updateIsread()}
                label="valider"
                isDisable={!isRead}
                isReady={true}
                isLoading={isLoading}
              />
            ) : null}
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
