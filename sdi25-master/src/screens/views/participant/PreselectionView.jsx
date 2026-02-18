import { handleServiceGetQuizState } from "../../../services/quizService.tsx";
import secureLocalStorage from "react-secure-storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Button from "../../../components/ui/ButtonUi.tsx";

export default function PreselectionView() {
  const storedUser = secureLocalStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [message, setMessage] = useState("");
  const { width, height } = useWindowSize();
  const [state, setState] = useState(false);
  const navigate = useNavigate();

  async function getQuizState() {
    try {
      const result = await handleServiceGetQuizState();

      // 🔒 Sécurité : éviter crash si API échoue
      if (!result || typeof result.canpasstest === "undefined") {
        setState(false);
        setMessage("Impossible de récupérer l'état du test.");
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
          setMessage("État du test inconnu");
      }
    } catch (err) {
      console.error("Erreur getQuizState:", err);
      setState(false);
      setMessage("Erreur serveur.");
    }
  }

  useEffect(() => {
    getQuizState();
  }, []);

  return (
    <div className="pt-9 min-h-screen px-4 lg:px-9 background-p">
      
      {user?.team_qualified ? (
        <Confetti width={width} height={height} />
      ) : null}

      <div className="text-center">
        <h2 className="text-2xl md:text-4xl font-black text-black dark:text-white">
          Informations sur la présélection
        </h2>
      </div>

      <section className="text-gray-600 body-font">
        <div className="container py-11 mx-auto">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto flex flex-col justify-center text-justify">

            <div>
              <h2 className="mt-9 text-2xl text-center font-black text-black dark:text-white">
                Test de présélection
              </h2>
              <p className="text-center mt-4">{message}</p>
            </div>

            {state && (
              <div className="flex justify-center mt-24">
                <Button
                  onClick={() => navigate("/hackathon/administration/Rules")}
                  isReady={true}
                  isDisable={false}
                  label="Commencer le test"
                />
              </div>
            )}

          </div> 
        </div>
      </section>
    </div>
  );
}
