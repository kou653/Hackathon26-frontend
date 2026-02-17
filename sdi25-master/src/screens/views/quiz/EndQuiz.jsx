import Button from "../../../components/ui/ButtonUi.tsx";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function EndQuiz() {
  const navigate = useNavigate();
  const goToNextpage = () => {
    navigate("/hackathon/administration/UsersScreen");
  };

  return (
    <div className="h-screen w-screen background-p flex justify-center items-center">
      <div className="w-[500px] sm:bg-white p-9 sm:shadow-[0_5px_19px_3px_rgba(0,0,0,0.1)] sm:rounded-3xl flex flex-col gap-8">
        <p className="font-bold text-center text-2xl">Test Terminé</p>
        <p className="text-[14px] text-center ">
          Vous avez terminé le test de préselection de l&apos;hackathon 2026.
          Vos réponses ont bien été prise en compte. Vous êtes donc prié de bien
          vouloir patienter le temps que les résultats soit proclamés.
        </p>
        <Button
          type="button"
          onClick={() => goToNextpage()}
          label="Continuer"
          isDisable={false}
          isReady={true}
        />
      </div>
    </div>
  );
}
