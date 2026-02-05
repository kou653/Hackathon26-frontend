// import logo from "../../assets/images/logoSDI-PhotoRoom.png";
import CancelButton from "../../../components/ui/CancelButton.tsx";
import InputField from "../../../components/ui/InputField.tsx";
import ButtonUi from "../../../components/ui/ButtonUi.tsx";
import Labelui from "../../../components/ui/labelui.tsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { handleServiceLogIn } from "../../../services/authService.tsx";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

export default function LogInView() {
  const navigate = useNavigate();

  // variable pour rendre le bouton cliquable
  const [isReady, setIsReady] = useState(false);
  const handleButtonStyle = (email: string, password: string) => {
    email === "" || password === "" ? setIsReady(false) : setIsReady(true);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [emailValue, setEmailValue] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
    handleButtonStyle(event.target.value, passwordValue);
  };

  const [passwordValue, setPasswordValue] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
    handleButtonStyle(emailValue, event.target.value);
  };

  const handleLogin = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setIsLoading(true);

    const userInfo = {
      email: emailValue,
      password: passwordValue,
    };

    handleServiceLogIn(userInfo).then((state) => {
      setTimeout(() => {
        setIsLoading(false);
        if (state) {
          navigate("/hackathon/administration/UsersScreen");
        }
      }, 3000);
    });
  };

  const [type, setType] = useState("password");

  const [isVisible, setIsVisible] = useState(false);
  const handleChangeVisibility = () => {
    setIsVisible(!isVisible);
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <div className="background-p h-screen w-screen sm:flex sm:flex-col sm:justify-center sm:items-center">
      <div className="md:p-9 p-4 sm:bg-white sm:w-[514px] h-full sm:h-[600px] flex flex-col justify-center items-center sm:rounded-3xl sm:shadow-lg">
        <div>
          <p className="calsans font-bold text-center text-[1.7em] mb-3">
            Connectez-vous à votre compte
          </p>
          <p className="mb-9 text-[15px] text-gray-500 text-center">
            Entrez vos identifiants pour vous connecter
          </p>
        </div>

        <form onSubmit={handleLogin} className="max-w-sm w-full mx-auto">
          <div className="flex flex-col gap-3 mb-6">
            <Labelui label="Votre email" />

            <InputField
              type="email"
              placeholder="name@gmail.com"
              value={emailValue}
              onChange={handleEmailChange}
              label={""}
              length={90}
            />
            <Labelui label="Votre mot de passe" />

            <div className="relative">
              <button
                type="button"
                className="absolute w-[20px] flex justify-center text-gray-400 top-[13px] right-[15px]"
                onClick={() => handleChangeVisibility()}
              >
                {isVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
              <InputField
                type={type}
                placeholder="*******"
                value={passwordValue}
                onChange={handlePasswordChange}
                length={90}
                label={""}
              />
            </div>
          </div>

          <div className="flex gap-4">
            <CancelButton type="button" label="Annuler" route="/" />
            <ButtonUi
              isLoading={isLoading}
              onClick={() => {
                return;
              }}
              label="Continuer"
              type="submit"
              isDisable={!isReady}
              isReady={isReady}
            />
          </div>

          
        </form>
      </div>
    </div>
  );
}
