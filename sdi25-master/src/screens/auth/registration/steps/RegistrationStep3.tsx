import InputField from "../../../../components/ui/InputField.tsx";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";
import HashLoader from "react-spinners/HashLoader";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { baseListGender } from "../../../../models/niveau.jsx";

import {
  getOptionLabel,
  getOptionValue,
} from "../../../../helpers/select/SelectHelper.tsx";
import { handleServiceRegister } from "../../../../services/authService.tsx";
import secureLocalStorage from "react-secure-storage";

// ============================================
// INTERFACES ET TYPES
// ============================================

interface SelectOption {
  value: number;
  label: string;
}

interface Level {
  value: number;
  label: string;
  classes: SelectOption[];
}

interface LeaderInformation {
  level: number;
  matricule: string;
  lastName: string;
  firstName: string;
  email: string;
  gender: string;
  school?: string;
  class?: number;
  teamName: string;
}

interface MemberInformation {
  matricule: string;
  lastName: string;
  firstName: string;
  email: string;
  gender: string;
  class: number;
}

interface TeamRegistrationData {
  esatic: number;
  niveau: number;
  nom_groupe: string;
  photo_groupe: string;
  matricule_chef: string;
  nom_chef: string;
  prenom_chef: string;
  classe_chef: number | undefined;
  email_chef: string;
  genre_chef: string;
  matricule_m2: string;
  nom_m2: string;
  prenom_m2: string;
  classe_m2: number;
  email_m2: string;
  genre_m2: string;
  matricule_m3: string;
  nom_m3: string;
  prenom_m3: string;
  classe_m3: number;
  email_m3: string;
  genre_m3: string;
}

interface RegistrationStep3Props {
  previousStep: () => void;
  nextStep: () => void;
}

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

export default function RegistrationStep3({
  previousStep,
}: RegistrationStep3Props) {
  const [comeFromEsatic, setComeFromEsatic] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [listClass, setListClass] = useState<SelectOption[]>([]);
  const navigate = useNavigate();

  // ============================================
  // ÉTAT MEMBRE 1
  // ============================================
  const [matriculeMembre1, setMatriculeMembre1] = useState("");
  const [lastnameMembre1, setLastnameMembre1] = useState("");
  const [firstnameMembre1, setFirstnameMembre1] = useState("");
  const [emailMembre1, setEmailMembre1] = useState("");
  const [genderValueMembre1, setGenderValueMembre1] = useState(0);
  const [classValueMembre1, setClassValueMembre1] = useState(0);
  const [schoolValueMembre1, setSchoolValueMembre1] = useState(0);

  // ============================================
  // ÉTAT MEMBRE 2
  // ============================================
  const [matriculeMembre2, setMatriculeMembre2] = useState("");
  const [lastnameMembre2, setLastnameMembre2] = useState("");
  const [firstnameMembre2, setFirstnameMembre2] = useState("");
  const [emailMembre2, setEmailMembre2] = useState("");
  const [genderValueMembre2, setGenderValueMembre2] = useState(0);
  const [classValueMembre2, setClassValueMembre2] = useState(0);
  const [schoolValueMembre2, setSchoolValueMembre2] = useState(0);

  // ============================================
  // FONCTIONS UTILITAIRES
  // ============================================

  const getStoredData = <T,>(key: string): T | null => {
    try {
      const data = secureLocalStorage.getItem(key);
      return data as T;
    } catch (error) {
      console.error(`Error retrieving ${key} from storage:`, error);
      return null;
    }
  };

  const loadMemberData = (
    memberData: unknown,
    setMatricule: (value: string) => void,
    setLastname: (value: string) => void,
    setFirstname: (value: string) => void,
    setEmail: (value: string) => void,
    setGender: (value: number) => void,
    setClass: (value: number) => void,
    setSchool: (value: number) => void
  ) => {
    if (!memberData || typeof memberData !== "object") return;

    const member = memberData as Record<string, unknown>;

    if (typeof member.matricule === "string") setMatricule(member.matricule);
    if (typeof member.lastName === "string") setLastname(member.lastName);
    if (typeof member.firstName === "string") setFirstname(member.firstName);
    if (typeof member.email === "string") setEmail(member.email);

    if (typeof member.gender === "string") {
      const genderValue = getOptionValue(baseListGender, member.gender);
      setGender(genderValue);
    }

    if (typeof member.class === "number") {
      setClass(member.class);
      setSchool(member.class);
    }
  };

  // ============================================
  // EFFET D'INITIALISATION
  // ============================================

  useEffect(() => {
    try {
      // Charger comeFromEsatic
      const storedEsatic = getStoredData<boolean>("comeFromEsatic");
      if (storedEsatic !== null) {
        setComeFromEsatic(storedEsatic);
      }

      // Charger les informations du leader et la liste des classes
      const leaderInformation = getStoredData<LeaderInformation>("leaderInformation");
      const levelsList = getStoredData<Level[]>("levelsList");

      if (leaderInformation && Array.isArray(levelsList)) {
        const levelValue = leaderInformation.level;

        levelsList.forEach((level: Level) => {
          if (level.value === levelValue && Array.isArray(level.classes)) {
            setListClass(level.classes);
          }
        });
      }

      // Charger les données du membre 1
      const user1 = getStoredData<MemberInformation>("informationAboutMembre1");
      if (user1) {
        loadMemberData(
          user1,
          setMatriculeMembre1,
          setLastnameMembre1,
          setFirstnameMembre1,
          setEmailMembre1,
          setGenderValueMembre1,
          setClassValueMembre1,
          setSchoolValueMembre1
        );
      }

      // Charger les données du membre 2
      const user2 = getStoredData<MemberInformation>("informationAboutMembre2");
      if (user2) {
        loadMemberData(
          user2,
          setMatriculeMembre2,
          setLastnameMembre2,
          setFirstnameMembre2,
          setEmailMembre2,
          setGenderValueMembre2,
          setClassValueMembre2,
          setSchoolValueMembre2
        );
      }

      setIsReady(true);
    } catch (error) {
      console.error("Error loading data:", error);
      setIsReady(true); // Permettre l'affichage même en cas d'erreur
    }
  }, []);

  // ============================================
  // HANDLERS D'ÉVÉNEMENTS
  // ============================================

  const handleMatriculeMembre1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatriculeMembre1(event.target.value);
  };

  const handleLastnameMembre1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastnameMembre1(event.target.value);
  };

  const handleFirstNameMembre1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstnameMembre1(event.target.value);
  };

  const handleEmailMembre1Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailMembre1(event.target.value);
  };

  const handleGenderChangeMembre1 = (selectedOption: SelectOption) => {
    setGenderValueMembre1(selectedOption.value);
  };

  const handleClassChangeMembre1 = (selectedOption: SelectOption) => {
    setClassValueMembre1(selectedOption.value);
  };

  const handleSchoolMembre1Change = (selectedOption: SelectOption) => {
    setSchoolValueMembre1(selectedOption.value);
  };

  const handleMatriculeMembre2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMatriculeMembre2(event.target.value);
  };

  const handleLastnameMembre2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLastnameMembre2(event.target.value);
  };

  const handleFirstNameMembre2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFirstnameMembre2(event.target.value);
  };

  const handleEmailMembre2Change = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailMembre2(event.target.value);
  };

  const handleGenderChangeMembre2 = (selectedOption: SelectOption) => {
    setGenderValueMembre2(selectedOption.value);
  };

  const handleClassChangeMembre2 = (selectedOption: SelectOption) => {
    setClassValueMembre2(selectedOption.value);
  };

  const handleSchoolMembre2Change = (selectedOption: SelectOption) => {
    setSchoolValueMembre2(selectedOption.value);
  };

  // ============================================
  // GESTION DU STOCKAGE ET NAVIGATION
  // ============================================

  const storeInLocalStorage = () => {
    const informationAboutMembre1: MemberInformation = {
      matricule: matriculeMembre1,
      lastName: lastnameMembre1,
      firstName: firstnameMembre1,
      email: emailMembre1,
      gender: getOptionLabel(baseListGender, genderValueMembre1),
      class: comeFromEsatic ? classValueMembre1 : schoolValueMembre1,
    };

    const informationAboutMembre2: MemberInformation = {
      matricule: matriculeMembre2,
      lastName: lastnameMembre2,
      firstName: firstnameMembre2,
      email: emailMembre2,
      gender: getOptionLabel(baseListGender, genderValueMembre2),
      class: comeFromEsatic ? classValueMembre2 : schoolValueMembre2,
    };

    secureLocalStorage.setItem(
      "informationAboutMembre1",
      informationAboutMembre1
    );

    secureLocalStorage.setItem(
      "informationAboutMembre2",
      informationAboutMembre2
    );
  };

  const goToPreviousStep = () => {
    storeInLocalStorage();
    previousStep();
  };

  // ============================================
  // VALIDATION ET SOUMISSION
  // ============================================

  const validateForm = (): boolean => {
    // Validation membre 1
    if (!lastnameMembre1.trim() || !firstnameMembre1.trim() || !emailMembre1.trim()) {
      alert("Veuillez remplir tous les champs obligatoires pour le Membre 2");
      return false;
    }

    if (comeFromEsatic && !matriculeMembre1.trim()) {
      alert("Le matricule du Membre 2 est requis");
      return false;
    }

    if (genderValueMembre1 === 0) {
      alert("Veuillez sélectionner le genre du Membre 2");
      return false;
    }

    if (comeFromEsatic && classValueMembre1 === 0) {
      alert("Veuillez sélectionner la classe du Membre 2");
      return false;
    }

    if (!comeFromEsatic && schoolValueMembre1 === 0) {
      alert("Veuillez sélectionner l'école du Membre 2");
      return false;
    }

    // Validation membre 2
    if (!lastnameMembre2.trim() || !firstnameMembre2.trim() || !emailMembre2.trim()) {
      alert("Veuillez remplir tous les champs obligatoires pour le Membre 3");
      return false;
    }

    if (comeFromEsatic && !matriculeMembre2.trim()) {
      alert("Le matricule du Membre 3 est requis");
      return false;
    }

    if (genderValueMembre2 === 0) {
      alert("Veuillez sélectionner le genre du Membre 3");
      return false;
    }

    if (comeFromEsatic && classValueMembre2 === 0) {
      alert("Veuillez sélectionner la classe du Membre 3");
      return false;
    }

    if (!comeFromEsatic && schoolValueMembre2 === 0) {
      alert("Veuillez sélectionner l'école du Membre 3");
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    storeInLocalStorage();

    try {
      const leaderInformation = getStoredData<LeaderInformation>("leaderInformation");
      const member1 = getStoredData<MemberInformation>("informationAboutMembre1");
      const member2 = getStoredData<MemberInformation>("informationAboutMembre2");

      if (!leaderInformation || !member1 || !member2) {
        throw new Error("Données manquantes. Veuillez recommencer l'inscription.");
      }

      const newTeam: TeamRegistrationData = {
        esatic: comeFromEsatic ? 1 : 0,
        niveau: leaderInformation.level ?? 0,
        nom_groupe: leaderInformation.teamName ?? "Equipe",
        photo_groupe: "pas_de_photo.png",

        matricule_chef: leaderInformation.matricule ?? "",
        nom_chef: leaderInformation.lastName ?? "",
        prenom_chef: leaderInformation.firstName ?? "",
        classe_chef: comeFromEsatic ? leaderInformation.class ?? 0 : 0,
        email_chef: leaderInformation.email ?? "",
        genre_chef: leaderInformation.gender ?? "",

        matricule_m2: member1.matricule ?? "",
        nom_m2: member1.lastName ?? "",
        prenom_m2: member1.firstName ?? "",
        classe_m2: member1.class ?? 0,
        email_m2: member1.email ?? "",
        genre_m2: member1.gender ?? "",

        matricule_m3: member2.matricule ?? "",
        nom_m3: member2.lastName ?? "",
        prenom_m3: member2.firstName ?? "",
        classe_m3: member2.class ?? 0,
        email_m3: member2.email ?? "",
        genre_m3: member2.gender ?? "",
      };


      const result = await handleServiceRegister(newTeam);

      if (result) {
        // Nettoyage du localStorage
        secureLocalStorage.removeItem("leaderInformation");
        secureLocalStorage.removeItem("informationAboutMembre1");
        secureLocalStorage.removeItem("informationAboutMembre2");
        secureLocalStorage.removeItem("comeFromEsatic");
        secureLocalStorage.removeItem("levelsList");

        setTimeout(() => {
          setIsLoading(false);
          navigate("/hackathon/auth/SuccessRegistration");
        }, 3000);
      } else {
        throw new Error("Échec de l'inscription");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
      setIsLoading(false);
    }
  };

  // ============================================
  // RENDU
  // ============================================

  if (!isReady) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        <HashLoader size={60} color="#F94C10" loading={true} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="w-full mx-auto max-w-4xl md:bg-white md:p-9 mb-9 md:shadow-xl md:rounded-3xl">
        <form onSubmit={handleSubmit}>
          <div className="w-full max-w-3xl mx-auto md:flex md:gap-6 md:p-9">
            {/* ========== MEMBRE 2 ========== */}
            <div className="md:w-1/2 mx-auto">
              <div className="flex flex-col gap-3">
                <h5 className="text-xl mb-4 font-bold text-gray-900 dark:text-white">
                  Membre 2
                </h5>

                {comeFromEsatic && (
                  <>
                    <Labelui label="Matricule" />
                    <InputField
                      label="Matricule"
                      length={30}
                      onChange={handleMatriculeMembre1Change}
                      value={matriculeMembre1}
                      placeholder="XX-ESATICXXXXX"
                      type="text"
                    />
                  </>
                )}

                <Labelui label="Nom" />
                <InputField
                  label="Nom"
                  length={30}
                  onChange={handleLastnameMembre1Change}
                  value={lastnameMembre1}
                  placeholder="Koffi"
                  type="text"
                />

                <Labelui label="Prénom" />
                <InputField
                  label="Prénom"
                  length={30}
                  onChange={handleFirstNameMembre1Change}
                  value={firstnameMembre1}
                  placeholder="Ange"
                  type="text"
                />

                <Labelui label="Email" />
                <InputField
                  label="Email"
                  length={30}
                  onChange={handleEmailMembre1Change}
                  value={emailMembre1}
                  placeholder="koffi@gmail.com"
                  type="email"
                />

                <Labelui label="Genre" />
                <SelectUi
                  placeholder="Choisissez"
                  options={baseListGender}
                  filterValue={genderValueMembre1}
                  onChange={handleGenderChangeMembre1}
                />

                {comeFromEsatic ? (
                  <>
                    <Labelui label="Classe" />
                    <SelectUi
                      placeholder="Choisissez"
                      options={listClass}
                      filterValue={classValueMembre1}
                      onChange={handleClassChangeMembre1}
                    />
                  </>
                ) : (
                  <>
                    <Labelui label="École" />
                    <SelectUi
                      placeholder="Choisissez"
                      options={listClass}
                      filterValue={schoolValueMembre1}
                      onChange={handleSchoolMembre1Change}
                    />
                  </>
                )}
              </div>
            </div>

            {/* ========== MEMBRE 3 ========== */}
            <div className="md:w-1/2 mt-8 md:mt-0 flex flex-col gap-3">
              <h5 className="text-xl mb-4 font-bold text-gray-900 dark:text-white">
                Membre 3
              </h5>

              {comeFromEsatic && (
                <>
                  <Labelui label="Matricule" />
                  <InputField
                    label="Matricule"
                    length={30}
                    onChange={handleMatriculeMembre2Change}
                    value={matriculeMembre2}
                    placeholder="XX-ESATICXXXXX"
                    type="text"
                  />
                </>
              )}

              <Labelui label="Nom" />
              <InputField
                label="Nom"
                length={30}
                onChange={handleLastnameMembre2Change}
                value={lastnameMembre2}
                placeholder="Koffi"
                type="text"
              />

              <Labelui label="Prénom" />
              <InputField
                label="Prénom"
                length={30}
                onChange={handleFirstNameMembre2Change}
                value={firstnameMembre2}
                placeholder="Emmanuel"
                type="text"
              />

              <Labelui label="Email" />
              <InputField
                label="Email"
                length={30}
                onChange={handleEmailMembre2Change}
                value={emailMembre2}
                placeholder="koffi@gmail.com"
                type="email"
              />

              <Labelui label="Genre" />
              <SelectUi
                placeholder="Choisissez"
                options={baseListGender}
                filterValue={genderValueMembre2}
                onChange={handleGenderChangeMembre2}
              />

              {comeFromEsatic ? (
                <>
                  <Labelui label="Classe" />
                  <SelectUi
                    placeholder="Choisissez"
                    options={listClass}
                    filterValue={classValueMembre2}
                    onChange={handleClassChangeMembre2}
                  />
                </>
              ) : (
                <>
                  <Labelui label="École" />
                  <SelectUi
                    placeholder="Choisissez"
                    options={listClass}
                    filterValue={schoolValueMembre2}
                    onChange={handleSchoolMembre2Change}
                  />
                </>
              )}
            </div>
          </div>

          {/* ========== BOUTONS ========== */}
          <div className="flex justify-center gap-4 mt-9">
            <Button
              isLoading={false}
              onClick={goToPreviousStep}
              type="button"
              label="Précédent"
              isDisable={isLoading}
              isReady={true}
            />

            <Button
              onClick={() => {
                // TODO: implement
              }}
              isLoading={isLoading}
              type="submit"
              label="Soumettre"
              isDisable={isLoading}
              isReady={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}