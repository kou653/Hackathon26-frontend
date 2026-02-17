import { handleServiceGetQuizState } from "../../../services/quizService.tsx";
import secureLocalStorage from "react-secure-storage";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import Button from "../../../components/ui/ButtonUi.tsx";

export default function PreselectionView() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  // ✅ user sécurisé
  const storedUser = secureLocalStorage.getItem("user");
const user = storedUser ? JSON.parse(storedUser) : null;
  const [message, setMessage] = useState("");
  const [state, setState] = useState<boolean>(false); // ✅ bool clair
  const [loading, setLoading] = useState(true); // optionnel mais propre

  async function getQuizState() {
    try {
      const result = await handleServiceGetQuizState();

      // ✅ sécurité anti-crash
      if (!result || result.canpasstest === undefined) {
        setState(false);
        setMessage("Impossible de récupérer l’état du test 😢");
        setLoading(false);
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
    } catch (e) {
      setState(false);
      setMessage("Erreur serveur 😢");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getQuizState();
  }, []);

  return (
    <div className="pt-9 min-h-screen px-4 lg:px-9 background-p">

      {/* 🎉 confetti sécurisé */}
      {user?.team_qualified ? <Confetti width={width} height={height} /> : null}

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

              {loading ? (
                <p className="text-center mt-4">Chargement...</p>
              ) : (
                <p className="text-center mt-4">{message}</p>
              )}
            </div>

            {state && !loading ? (
              <div className="flex justify-center mt-24">
                <Button
                  onClick={() => navigate("/hackathon/administration/Rules")}
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
