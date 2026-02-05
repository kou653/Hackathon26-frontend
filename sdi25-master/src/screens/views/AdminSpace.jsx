import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCode, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import HashLoader from "react-spinners/HashLoader";
import React, { useState } from "react";
import { useEffect } from "react";

export default function AdminSpace() {
  const [teamUsersList, setTeamUsersList] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const decodedUserRole = secureLocalStorage.getItem("user_role");
    const decodedTeam = secureLocalStorage.getItem("team");
    const decodedUser = secureLocalStorage.getItem("user").etudiant;

    if (decodedTeam && decodedUser && decodedUserRole) {
      setUserRole(decodedUserRole);
      setTeamUsersList(decodedTeam);
      setUser(decodedUser);

      decodedTeam.forEach((element) => {
        if (element.matricule === decodedUser.matricule && element.chef === 1) {
          setIsLeader(true);
        }
      });
    }

    setIsReady(true);
  }, []);

  return (
    <div>
      {isReady ? (
        <div className="mt-9 min-h-screen px-4 lg:px-9">
          <div className="text-center">
            <div className="mb-1 text-sm font-bold uppercase tracking-wider text-[#F94C10] dark:text-blue-500">
              COUCOU 👋🏽
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white">
              Bienvenue sur Notre SDI
            </h2>
          </div>

          {userRole === "participant" ? (
            <div className="lg:mt-24 mt-11">
              <p className="text-lg text-center font-semibold">
                INFORMATIONS SUR L&apos;ÉQUIPE
              </p>
              <div className="container py-4 mx-auto">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {teamUsersList.map((element, index) => (
                    <div
                      key={index}
                      className="rounded-lg duration-700 border border-white bg-white p-5 shadow-sm transition border-2 hover:border-[#F94C10] hover:bg-[#F94C10]/10 dark:border-gray-800 dark:bg-gray-800 dark:shadow-none dark:hover:border-blue-400 md:p-7 xl:p-10"
                    >
                      <FontAwesomeIcon
                        className="text-[#F94C10] text-4xl mb-4"
                        icon={faUserSecret}
                      />
                      <h4 className="mb-2 text-lg font-bold">
                        {element.matricule}
                      </h4>
                      <h4 className="mb-2 text-lg font-bold">
                        {element.nom + " " + element.prenom}
                      </h4>
                      <p className="leading-relaxed text-gray-600 dark:text-gray-400">
                        {element.classe}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {isLeader && userRole === "participant" ? (
            <section className="text-gray-600 body-font">
              <div className="container py-11 mx-auto">
                {/* <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-justify">
                  <FontAwesomeIcon
                    className="text-[#F94C10] text-4xl mb-4"
                    icon={faCode}
                  />
                  <p className="font-bold text-xl mb-4">
                    Avis au chef de l&apos;équipe{" "}
                    <span className="text-orange-400">
                      (Externe à l&apos;ESATIC -- Niveau 3)
                    </span>
                  </p>
                  <p className="leading-relaxed text-lg">
                    Chèr capitaine, vous devez vous munir avec votre équipe de{" "}
                    <span className="font-bold text-[#F94C10]">documents </span>
                    attestants que vous êtes inscrits pour des cours en Master
                    au cours de cette année scolaire (reçu d&apos;inscription,
                    certificat de fréquentation, certificat de scolarité,
                    etc...) et éventuellement d&apos;une pièce d&apos;identité.
                    Ils seront controlés le jour du lancement du Tecknovore Hackathon.
                  </p>
                  <span className="inline-block h-1 w-10 rounded bg-yellow-500 mt-8 mb-6"></span>
                  <h2 className="text-gray-900 font-medium title-font tracking-wider text-sm">
                    C2E
                  </h2>
                </div> */}
              </div>
            </section>
          ) : null}

          <section className="text-gray-600 body-font">
            <div className="container py-11 mx-auto">
              <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-justify">
                <p className="font-bold text-2xl">
                  <span className="text-[#F94C10]">Bienvenue</span>{" "}
                  {userRole === "participant"
                    ? user.nom
                    : "chèr(e) administrateur"}{" "}
                  sur votre espace
                </p>
                <p className="text-base mt-4">
                  Cet espace te permettra de consulter les résultats et de
                  consulter les informations relatives à ton groupe.
                </p>
                <p className="text-base mt-4">
                  <span className="font-bold text-[#F94C10]">
                    HackEat {">>"}{" "}
                  </span>{" "}
                  est l&apos;espace te permettant d&apos;avoir accès à la
                  restauration de l&apos;hackathon. Il faut noter que pour toute
                  personne sélèctionnée la restauration sera assurée les :{" "}
                  <br />{" "}
                  <span className="font-bold text-gray-600">
                    Vendredi et Samedi | matin, midi et soir Dimanche | matin et
                    midi
                  </span>
                </p>
                <p className="text-base mt-4">
                  <span className="font-bold text-[#F94C10]">
                    HackNight {">>"}{" "}
                  </span>{" "}
                  est l&apos;espace te permettant d&apos;avoir accès aux
                  collations relatives à l&apos;hackaton. Il est bon de noter
                  que pour toute personne sélèctionnée les collations seront
                  mise a votre disposition le vendredi et le samedi aux heures
                  suivantes : <br />{" "}
                  <span className="font-bold text-gray-600">
                    22h30 | 00h30 | 03h30
                  </span>
                </p>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={!isReady} />
        </div>
      )}
    </div>
  );
}
