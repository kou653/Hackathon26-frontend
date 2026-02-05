import { baseListGender, otherSchool } from "../../../../models/niveau.jsx";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
import React from "react";

import {
  getOptionLabel,
  getOptionValue,
} from "../../../../helpers/select/SelectHelper.tsx";

import InputField from "../../../../components/ui/InputField.tsx";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";
import { handleServiceGetLevelsList } from "../../../../services/ConstantsService.tsx";
import secureLocalStorage from "react-secure-storage";

interface LeaderInformation {
  level: number;
  teamName: string;
  matricule: string;
  lastName: string;
  firstName: string;
  email: string;
  gender: string;
  class: number;
}


export default function RegistrationStep2({
  previousStep,
  nextStep,
}: {
  previousStep: any;
  nextStep: any;
}) {
  // get variable come from esatic

  const [comeFromEsatic, setComeFromEsatic] = useState(Boolean);
  const [baseLevel, setBaseLevel] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedData = secureLocalStorage.getItem("comeFromEsatic");

    if (storedData === true || storedData === false) {
      setComeFromEsatic(storedData);
      if (!storedData) {
        setListClass(listSchool);
      }

      const data = {
        esatic: storedData === true ? 1 : 0,
      };

      handleServiceGetLevelsList(data).then((result) => {
        const temp = result.niveaux.map(
          (item: { id: unknown; libelle: string; classes: any }) => ({
            value: item.id,
            label: item.libelle,
            classes: item.classes.map((classe: { id: any; libelle: any }) => ({
              value: classe.id,
              label: classe.libelle,
            })),
          })
        );

        secureLocalStorage.setItem("levelsList", temp);
        setBaseLevel(temp);
      });
    }
    const storedLeaderInfo = secureLocalStorage.getItem("leaderInformation") as LeaderInformation | null;

if (storedLeaderInfo) {
  setTeamName(storedLeaderInfo.teamName);
  setMatricule(storedLeaderInfo.matricule);
  setLastname(storedLeaderInfo.lastName);
  setFirstname(storedLeaderInfo.firstName);
  setEmail(storedLeaderInfo.email);
  setFilterValue(getOptionValue(baseLevelList, storedLeaderInfo.level));
  setGenderValue(getOptionValue(listGender, storedLeaderInfo.gender));
  setClassValue(getOptionValue(listClass, storedLeaderInfo.class));
}


    // const leaderInformation = secureLocalStorage.getItem("leaderInformation");

    // if (leaderInformation) {
    //   setTeamName(leaderInformation["teamName"]);
    //   setMatricule(leaderInformation["matricule"]);
    //   setLastname(leaderInformation["lastName"]);
    //   setFirstname(leaderInformation["firstName"]);
    //   setEmail(leaderInformation["email"]);
    //   setFilterValue(getOptionValue(baseLevelList, leaderInformation["level"]));
    //   setGenderValue(getOptionValue(listGender, leaderInformation["gender"]));
    //   setClassValue(getOptionValue(listClass, leaderInformation["class"]));
    // }

    setIsReady(true);
  }, []);

  // gestion du select de Niveau

  const baseLevelList = baseLevel;
  const [filterLevelValue, setFilterValue] = useState(0);
  const handleLevelChange = (selectedOption: { value: number }) => {
    setFilterValue(selectedOption.value);

    if (!comeFromEsatic) {
      setListClass(listSchool);
      return true;
    }

    switchList(selectedOption.value);
  };

  const switchList = (value: any) => {
    baseLevel.forEach((level) => {
      if (level["value"] === value) {
        setListClass(level["classes"]);
      }
    });
  };

  // list of students of others school

  const listSchool = otherSchool;

  // Gestion du select de Genre

  const [GenderValue, setGenderValue] = useState(0);
  const listGender = baseListGender;

  const handleGenderChange = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setGenderValue(selectedOption.value);
  };

  // gestion du select de la Classe

  const [ClassValue, setClassValue] = useState(0);
  const [listClass, setListClass] = useState<
    { value: number; label: string }[]
  >([]);
  const handleClassChange = (selectedOption: {
    value: React.SetStateAction<number>;
  }) => {
    setClassValue(selectedOption.value);
  };

  // gestion de ...

  // const [listLevel, setListLevel] = useState(baseLevelList);

  const goToPreviousStep = () => {
    storeInLocalStorage();
    previousStep();
  };

  // nom de l'équipe
  const [teamName, setTeamName] = useState("");
  const handleTeamNameChange = (event: { target: { value: string } }) => {
    setTeamName(event.target.value);
  };

  // matricule chef
  const [matricule, setMatricule] = useState("");
  const handleMAtriculeChange = (event: { target: { value: string } }) => {
    setMatricule(event.target.value);
  };

  // nom du chef
  const [lastname, setLastname] = useState("");
  const handleLastnameChange = (event: { target: { value: string } }) => {
    setLastname(event.target.value);
  };

  // prenom du chef
  const [firstname, setFirstname] = useState("");
  const handleFirstNameChange = (event: { target: { value: string } }) => {
    setFirstname(event.target.value);
  };

  // email du chef
  const [email, setEmail] = useState("");
  const handleEmailChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
  };

  // store in localStorage

  const storeInLocalStorage = () => {
    const leaderInformation = {
      level: filterLevelValue,
      teamName: teamName,
      matricule: matricule,
      lastName: lastname,
      firstName: firstname,
      email: email,
      gender: getOptionLabel(listGender, GenderValue),
      class: ClassValue,
    };

    secureLocalStorage.setItem("leaderInformation", leaderInformation);
    return;
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    storeInLocalStorage();
    nextStep();
  };

  return (
    <div className="w-full">
      {isReady ? (
        <div className="w-full mx-auto max-w-3xl md:bg-white md:p-9 mb-9 md:shadow-xl md:rounded-3xl">
          <form
            className="space-y-6 py-9 mx-auto"
            onSubmit={handleSubmit}
            action="#"
          >
            <div className="md:flex md:items-start md:justify-center md:gap-9">
              <div className="flex flex-col md:w-1/2">
                <h5 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                  Informations du groupe
                </h5>
                <div className="flex flex-col gap-3">
                  <Labelui label="Niveau" />
                  <SelectUi
                    placeholder="Choisissez"
                    options={baseLevelList}
                    filterValue={filterLevelValue}
                    onChange={handleLevelChange}
                  />

                  <Labelui label="Nom de l'équipe" />
                  <InputField
                    label="nom de l'équipe"
                    onChange={handleTeamNameChange}
                    value={teamName}
                    length={15}
                    placeholder="Nom du groupe"
                    type="text"
                  />
                </div>
              </div>

              <div className="md:w-1/2 md:mt-0 my-8">
                <h5 className="text-xl mb-4 font-bold text-gray-900 dark:text-white">
                  Chef de l&apos;équipe
                </h5>

                <div className="flex flex-col gap-3 ">
                  {comeFromEsatic === true ? (
                    <div className="flex flex-col gap-3">
                      <Labelui label="Matricule" />
                      <InputField
                      label="Matricule"
                        onChange={handleMAtriculeChange}
                        value={matricule}
                        length={18}
                        placeholder="XX-ESATICXXXXX"
                        type="text"
                      />
                    </div>
                  ) : null}

                  <Labelui label="Nom" />
                  <InputField
                  label="Nom"
                    onChange={handleLastnameChange}
                    value={lastname}
                    placeholder="koffi"
                    length={12}
                    type="text"
                  />

                  <Labelui label="Prénom" />
                  <InputField
                   label="Prénom"
                    onChange={handleFirstNameChange}
                    value={firstname}
                    placeholder="Ange"
                    length={30}
                    type="text"
                  />

                  <Labelui label="Email" />
                  <InputField
                  label="Email"
                    onChange={handleEmailChange}
                    value={email}
                    placeholder="koffi@gmail.com"
                    length={40}
                    type="email"
                  />

                  <Labelui label="Genre" />
                  <SelectUi
                    placeholder="Choisissez"
                    options={listGender}
                    filterValue={GenderValue}
                    onChange={handleGenderChange}
                  />

                  <Labelui label={comeFromEsatic ? "Classe" : "École"} />
                  <SelectUi
                    placeholder="Choisissez"
                    options={listClass}
                    filterValue={ClassValue}
                    onChange={handleClassChange}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                isLoading={false}
                onClick={goToPreviousStep}
                type="button"
                label="Précédent"
                isDisable={false}
                isReady={true}
              />
              <Button
                isLoading={false}
                type="submit"
                label="Suivant"
                isDisable={false}
                isReady={true}
                onClick={() => {
                  return;
                }}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={!isReady} />
        </div>
      )}
    </div>
  );
}
