import { handleServiceGetQuizState } from "../../../services/quizService.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";
import secureLocalStorage from "react-secure-storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Button from "../../../components/ui/ButtonUi.tsx";

export default function PreselectionView() {
  const user = secureLocalStorage.getItem("user");
  // console.log(user.team_qualified);
  const [message, setMessage] = useState("");
  const { width, height } = useWindowSize();
  const [state, setState] = useState(null);
  const navigate = useNavigate();

  async function getQuizState() {
  const result = await handleServiceGetQuizState();

  if (!result) {
    setState(false);
    setMessage("Impossible de récupérer l'état du quiz.");
    return;
  }

  switch (result.canpasstest) {
    case 0:
      setState(true);
      setMessage("Vous pouvez désormais passer le test 💀");
      break;
    case 1:
      setState(false);
      setMessage("Le test n'est pas disponible pour ce niveau 🥲");
      break;
    case 2:
      setState(false);
      setMessage("Le test est fermé pour le moment... 😭");
      break;
    case 3:
      setState(false);
      setMessage("Vous avez déjà passé le quiz... 😭");
      break;
    default:
      setState(false);
      break;
  }
}


  useEffect(() => {
    getQuizState();
  }, []);

  return (
    <div className="pt-9 min-h-screen px-4 lg:px-9 background-p">
      
      {user.team_qualified
        ?( <Confetti width={width} height={height} />)
        : null}

      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white">
          Informations sur la présélection
        </h2>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container py-11 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto flex flex-col justify-center text-justify">
            {/* <FontAwesomeIcon
              className="text-[#F94C10] mx-auto text-4xl mb-4"
              icon={faCode}
            />
            <p className="font-bold text-xl mb-4 text-center">
              Résultat de la présélection
            </p>
            <div className="text-center">
              {user.team_qualified === 1
                ? "Félicitations, vous êtes qualifié pour l'hackathon 🥳"
                : "Désolé vous n'avez pas été retenu pour l'hackathon 😭😭😭😭"}
            </div>
            <h2 className="text-gray-900 text-center font-medium title-font tracking-wider text-sm mb-9">
              C2E
            </h2> */}

            <div>
              <h2 className="mt-9 text-2xl text-center font-black text-black dark:text-white">
                Test de présélection
              </h2>
              <p className="text-center mt-4"> {message} </p>
            </div>

            {state ? (
              <div className="flex justify-center mt-24">
                <Button
                  onClick={() => {
                    navigate("/hackathon/administration/Rules");
                  }}
                  isReady={true}
                  isDisable={false}
                  label="Commencer le test"
                />
              </div>
            ) : null}
          </div> 
        </div>
      </section>
    </div>
  );
}
