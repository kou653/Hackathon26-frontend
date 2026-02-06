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

interface LevelOption {
  value: number;
  label: string;
  classes: ClassOption[];
}

interface ClassOption {
  value: number;
  label: string;
}

export default function RegistrationStep2({
  previousStep,
  nextStep,
}: {
  previousStep: any;
  nextStep: any;
}) {
  // États
  const [comeFromEsatic, setComeFromEsatic] = useState<boolean>(false);
  const [baseLevel, setBaseLevel] = useState<LevelOption[]>([]);
  const [isReady, setIsReady] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [matricule, setMatricule] = useState("");
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [filterLevelValue, setFilterValue] = useState(0);
  const [GenderValue, setGenderValue] = useState(0);
  const [ClassValue, setClassValue] = useState(0);
  const [listClass, setListClass] = useState<ClassOption[]>([]);

  const listGender = baseListGender;
  const listSchool = otherSchool;

  // 🔥 Chargement des données au montage du composant
 useEffect(() => {
  const initializeData = async () => {
    try {
      console.log("🔵 1. Début du chargement des données");

      const storedData = secureLocalStorage.getItem("comeFromEsatic");
      console.log("🔵 2. comeFromEsatic:", storedData);

      if (storedData !== true && storedData !== false) {
        console.log("❌ comeFromEsatic n'est pas défini correctement");
        setIsReady(true);
        return;
      }

      const isEsatic = storedData === true;
      setComeFromEsatic(isEsatic);

      if (!isEsatic) {
        setListClass(listSchool);
      }

      const data = {
        esatic: isEsatic ? 1 : 0,
      };

      console.log("🔵 3. Envoi des données à l'API:", data);

      // Appel API
      const result = await handleServiceGetLevelsList(data);

      console.log("🔵 4. Résultat de l'API:", result);

      // ✅ Vérifier que result existe ET qu'il a la propriété niveaux
      if (result && result.niveaux && Array.isArray(result.niveaux)) {
        console.log("🔵 5. Niveaux reçus:", result.niveaux);

        // Transformer les données
        const temp = result.niveaux.map(
          (item: { id: number; libelle: string; classes: any[] }) => {
            console.log("🔵 6. Mapping niveau:", item.libelle);
            return {
              value: item.id,                                                                    
              label: item.libelle,
              classes: item.classes.map((classe: { id: number; libelle: string }) => ({
                value: classe.id,
                label: classe.libelle,
              })),
            };
          }
        );

        console.log("🔵 7. Données transformées:", temp);

        setBaseLevel(temp);
        secureLocalStorage.setItem("levelsList", temp);

        console.log("✅ Niveaux chargés avec succès:", temp.length, "niveaux");
      } else {
        console.log("❌ Aucune donnée de niveaux reçue ou format incorrect");
        console.log("❌ result:", result);
        console.error("error", "Impossible de charger les niveaux. Vérifiez votre connexion.");
      }

      // Récupérer les informations du leader
      const storedLeaderInfo = secureLocalStorage.getItem("leaderInformation") as LeaderInformation | null;

      if (storedLeaderInfo) {
        console.log("🔵 8. Restauration des infos du leader:", storedLeaderInfo);
        
        setTeamName(storedLeaderInfo.teamName);
        setMatricule(storedLeaderInfo.matricule);
        setLastname(storedLeaderInfo.lastName);
        setFirstname(storedLeaderInfo.firstName);
        setEmail(storedLeaderInfo.email);
        setFilterValue(storedLeaderInfo.level);
        
        const genderValue = getOptionValue(listGender, storedLeaderInfo.gender);
        if (genderValue !== undefined) {
          setGenderValue(genderValue);
        }
        
        setClassValue(storedLeaderInfo.class);
      }

      console.log("✅ Initialisation terminée");
      setIsReady(true);

    } catch (error) {
      console.error("❌ Erreur lors de l'initialisation:", error);
      console.error("error", "Une erreur s'est produite lors du chargement");
      setIsReady(true);
    }
  };

  initializeData();
}, []);

  // Gestion du changement de niveau
  const handleLevelChange = (selectedOption: { value: number }) => {
    console.log("🔵 Niveau sélectionné:", selectedOption.value);
    setFilterValue(selectedOption.value);
    setClassValue(0); // Réinitialiser la classe

    if (!comeFromEsatic) {
      console.log("🔵 Pas ESATIC, utilisation de listSchool");
      setListClass(listSchool);
      return;
    }

    // Trouver les classes du niveau sélectionné
    const selectedLevel = baseLevel.find((level) => level.value === selectedOption.value);
    console.log("🔵 Niveau trouvé:", selectedLevel);

    if (selectedLevel && selectedLevel.classes) {
      console.log("🔵 Classes du niveau:", selectedLevel.classes);
      setListClass(selectedLevel.classes);
    } else {
      console.log("❌ Aucune classe trouvée pour ce niveau");
      setListClass([]);
    }
  };

  // Gestion du changement de genre
  const handleGenderChange = (selectedOption: { value: number }) => {
    setGenderValue(selectedOption.value);
  };

  // Gestion du changement de classe
  const handleClassChange = (selectedOption: { value: number }) => {
    setClassValue(selectedOption.value);
  };

  // Handlers pour les champs
  const handleTeamNameChange = (event: { target: { value: string } }) => {
    setTeamName(event.target.value);
  };

  const handleMatriculeChange = (event: { target: { value: string } }) => {
    setMatricule(event.target.value);
  };

  const handleLastnameChange = (event: { target: { value: string } }) => {
    setLastname(event.target.value);
  };

  const handleFirstNameChange = (event: { target: { value: string } }) => {
    setFirstname(event.target.value);
  };

  const handleEmailChange = (event: { target: { value: string } }) => {
    setEmail(event.target.value);
  };

  // Sauvegarder dans le localStorage
  const storeInLocalStorage = () => {
    const leaderInformation: LeaderInformation = {
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
  };

  const goToPreviousStep = () => {
    storeInLocalStorage();
    previousStep();
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
          {/* DEBUG INFO - Retirez ce bloc en production */}
          <div style={{ padding: '10px', background: '#f0f0f0', marginBottom: '10px', fontSize: '12px' }}>
            <strong>Debug Info:</strong><br />
            Niveaux chargés: {baseLevel.length}<br />
            Classes disponibles: {listClass.length}<br />
            Niveau sélectionné: {filterLevelValue}<br />
            Classe sélectionnée: {ClassValue}<br />
            comeFromEsatic: {comeFromEsatic ? "Oui" : "Non"}
          </div>

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
                  
                  {/* Affichage du nombre de niveaux */}
                  {baseLevel.length === 0 && (
                    <p style={{ color: 'red', fontSize: '12px' }}>
                      ⚠️ Aucun niveau disponible
                    </p>
                  )}
                  
                  <SelectUi
                    placeholder="Choisissez un niveau"
                    options={baseLevel}
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

                <div className="flex flex-col gap-3">
                  {comeFromEsatic === true ? (
                    <div className="flex flex-col gap-3">
                      <Labelui label="Matricule" />
                      <InputField
                        label="Matricule"
                        onChange={handleMatriculeChange}
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
                    placeholder="Koffi"
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
                    placeholder="Choisissez un genre"
                    options={listGender}
                    filterValue={GenderValue}
                    onChange={handleGenderChange}
                  />

                  <Labelui label={comeFromEsatic ? "Classe" : "École"} />
                  
                  {/* Affichage du nombre de classes */}
                  {listClass.length === 0 && filterLevelValue !== 0 && (
                    <p style={{ color: 'red', fontSize: '12px' }}>
                      ⚠️ Aucune classe disponible pour ce niveau
                    </p>
                  )}
                  
                  <SelectUi
                    placeholder={comeFromEsatic ? "Choisissez une classe" : "Choisissez une école"}
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