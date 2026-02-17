import Button from "../../../components/ui/ButtonUi.tsx";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function SuccessRegistration() {
  const navigate = useNavigate();
  const goToNextpage = () => {
    navigate("/hackathon/auth/LogInView");
  }; 
  const goToWhatsApp = () => {
    //https://chat.whatsapp.com/GZX3JYvduuIBRLZr7ywqH6
    navigate("/hackathon/auth/LogInView");
    window.open("https://chat.whatsapp.com/JK5sFrSt3V0JoBNrHJOhMl?mode=gi_t", "_blank");
  };
  return (
    <div className="h-screen w-screen background-p flex justify-center items-center">
      <div className="w-[500px] sm:bg-white p-9 sm:shadow-[0_5px_19px_3px_rgba(0,0,0,0.1)] sm:rounded-3xl flex flex-col gap-8">
        <p className="font-bold text-center text-2xl">
          Félicitation, Vous êtes bien inscrit à l&apos;hackthon 2026
        </p>
        <p className="text-[14px] text-center ">
          Vous pouvez désormais vous connecter à votre espace candidat avec{" "}
          <span className="font-bold">
            l&apos;email utilisé pendant l&apos;inscription
          </span>{" "}
          et le mot de passe{" "}
          <span className="font-bold text-xl text--[#F94C10]">NotreSDI25@TH12345</span>{" "} <br />
          En attendant, rejoignez le groupe WhatsApp des chefs d&apos;équipe pour plus d&apos;informations.
        </p>
        <Button
          type="button"
          onClick={() => goToWhatsApp()}
          label="Groupe WhatsApp"
          isDisable={false}
          isReady={true}
        />
      </div>
    </div>
  );
}
