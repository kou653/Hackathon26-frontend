import { PaginatedItems } from "../../components/PageIndicator";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import React from "react";

import InputField from "../../components/ui/InputField.tsx";
import SelectUi from "../../components/ui/SelectUi.tsx";
import Button from "../../components/ui/ButtonUi.tsx";
import { handleServiceGetLevelsList } from "../../services/ConstantsService.tsx";
import { handleServiceGetTeams } from "../../services/teamsService.tsx";
import {
  handleServiceOpenSessionQuizTeam,
  handleServiceQualifyAutomaticallyTeams,
  handleServiceQualifyTeam,
} from "../../services/PreselectionService.tsx";

export default function TeamsView() {
  const [isLoading, setIsLoading] = useState(false);
  const [groupList, setGroupList] = useState([]);

  // variable for select
  const [selectionValue, setSelectionValue] = useState(1);
  const [levelList, setLevelList] = useState([]);
  const handleChangeSelectionValue = (selectedOption) => {
    setSelectionValue(selectedOption.value);
  };

  // variable for input number ...
  const [numberValue, setNumberValue] = useState(0);
  const handleChangeNumberValue = (event) => {
    setNumberValue(event.target.value);
  };

  // variable pour la checkbox (groupes sélectionnés...)
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  // useEffect - Chargement initial
  useEffect(() => {
    setIsLoading(true);
    getLevels();
  }, []);

  // Charger les groupes quand les filtres changent
  useEffect(() => {
    getGroups();
  }, [selectionValue, isChecked]);

  // Actualisation automatique des groupes toutes les 15 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      getGroups();
    }, 60000);

    return () => clearInterval(interval);
  }, [selectionValue, isChecked]);

  // get information about level
  function getLevels() {
    setIsLoading(true);

    handleServiceGetLevelsList({ esatic: 1 }).then((result) => {
      const temp = result.niveaux.map((item) => ({
        value: item.id,
        label: item.libelle,
      }));

      setLevelList(temp);
      setIsLoading(false);
    });
  }

  async function getGroups() {
    const data = {
      statut: isChecked ? 1 : 0,
      niveauId: selectionValue,
    };
    const result = await handleServiceGetTeams(data);
    setGroupList(result);
  }

  // get information about group list

  function TableHeader() {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          Nom de l&apos;équipe
        </th>
        <th scope="col" className="px-6 py-3">
          Membres
        </th>
        <th scope="col" className="px-6 py-3">
          Option
        </th>
        <th scope="col" className="px-6 py-3">
          Score
        </th>
      </tr>
    );
  }

  const handleQualifyTeam = (id) => {
    Swal.fire({
      title: "Qualification",
      text: "Êtes-vous sûr de vouloir qualifier/disqualifier cette équipe ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          equipeId: id,
        };
        await handleServiceQualifyTeam(data);
        if (data) {
          Swal.fire({
            title: "Mise à jour !",
            text: "Mise à jour effectuée !",
            icon: "success",
          });
        }
        getGroups();
        setIsLoading(false);
      }
    });
  };

  const handleAutomaticQualify = () => {
    Swal.fire({
      title: "Qualification",
      text: "Êtes-vous sûr de vouloir qualifier automatiquement les équipes ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          niveauId: selectionValue,
          nbreEquipe: numberValue,
        };
        const result = await handleServiceQualifyAutomaticallyTeams(data);
        if (result) {
          Swal.fire({
            title: "Sélection",
            text: "Les équipes ont bien été sélectionnées",
            icon: "success",
          });
        }
        getGroups();
        setIsLoading(false);
      }
    });
  };

  const handleOpenTeamSession = (id) => {
    Swal.fire({
      title: "Session",
      text: "Êtes-vous sûr de vouloir ré-ouvrir la session de cette équipe ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Ouvrir",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          equipeId: id,
        };
        // console.log(data);
        await handleServiceOpenSessionQuizTeam(data);
        if (data) {
          Swal.fire({
            title: "Mise à jour !",
            text: "La session de cette équipe a bien été ré-ouverte",
            icon: "success",
          });
        }
        getGroups();
        setIsLoading(false);
      }
    });
  };

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
                {item.nom}{" "}
                {item.is_extern ? (
                  <span className="px-2 py-1 bg-blue-200 text-blue-500 rounded-lg">
                    externe
                  </span>
                ) : null}
              </th>

              <td className="px-6 py-4">
                {item.participants && item.participants.length > 0 ? (
                  item.participants.map((participant, i) => (
                    <p
                      key={i}
                      className={participant?.chef === 1 ? "underline-offset-4" : ""}
                    >
                      -{" "}
                      {participant?.etudiant
                        ? `${participant.etudiant.nom} ${participant.etudiant.prenom}`
                        : "Participant manquant"}
                    </p>
                  ))
                ) : (
                  <p>Aucun participant</p>
                )}
              </td>

              <th>
                <button
                  onClick={() => handleQualifyTeam(item.id)}
                  className="font-medium text-green-500 bg-green-200 px-2 py-1 ml-6 rounded-lg mr-4"
                >
                  {item.statut !== 1 ? "Qualifier" : "Disqualifier"}
                </button>
                {item.niveau?.quiz_available === 1 && (
                  <button
                    onClick={() => handleOpenTeamSession(item.id)}
                    className="text-base font-medium text-orange-500 bg-orange-100 px-4 py-2 rounded-lg"
                  >
                    Rénitialiser le quiz
                  </button>
                )}
              </th>

              <th>
                <p className="text-base font-medium text-gray-900 px-6 py-2 rounded-lg">
                  {item.qsession
                    ? `${item.qsession.score} /${item.qsession.quiz?.score ?? 0}`
                    : "0"}
                </p>
              </th>
            </tr>
          ))}
      </>
    );
  }


  return (
    <div className="w-full">
      {!isLoading ? (
        <div className="md:p-9">
          <div className="mt-6 flex sm:flex-row flex-col gap-4 p-4 max-w-[900px] mx-auto">
            <div className="sm:w-1/2 flex flex-col  gap-4 justify-between">
              <div className="flex items-center gap-4">
                <InputField
                  onClick={() => {
                    return;
                  }}
                  label="Équipes sélectionnées"
                  type="checkbox"
                  value={isChecked}
                  onChange={handleCheckboxChange}
                  min={0}
                  placeholder="0"
                />
              </div>
              <SelectUi
                placeholder="Choisissez"
                options={levelList}
                filterValue={selectionValue}
                onChange={handleChangeSelectionValue}
              />
            </div>

            <div className="sm:w-1/2 space-y-3">
              <InputField
                onClick={() => {
                  return;
                }}
                onChange={handleChangeNumberValue}
                value={numberValue}
                min={0}
                placeholder="0"
                type="number"
              />
              <div className="min-w-72 flex gap-3">
                <Button
                  onClick={() => handleAutomaticQualify()}
                  label="Sélection automatique"
                  type="button"
                  isDisable={false}
                  isReady={true}
                // isLoading={isLoading}
                />
                <Button
                  label="Actualiser"
                  onClick={() => getGroups()}
                  type="button"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                />
              </div>
            </div>
          </div>
          <div className="mt-9 w-full">
            <p className="ml-6 mb-3 calsans"> {groupList.length} équipes </p>
            <PaginatedItems
              itemsPerPage={4}
              item={groupList}
              tableHeader={TableHeader}
              Items={Items}
            />
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={isLoading} />
        </div>
      )}
    </div>
  );
}
