import { handleServiceLogOut } from "../services/authService.tsx";
import {
  faArrowRightFromBracket,
  faCircleInfo,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "../assets/images/logoHackathon-PhotoRoom.png";
import secureLocalStorage from "react-secure-storage";
import HashLoader from "react-spinners/HashLoader";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "react-modern-drawer/dist/index.css";
import Drawer from "react-modern-drawer";
import { Link } from "react-router-dom";
import React from "react";
import Button from "./ui/ButtonUi.tsx";

export default function NavBar() {
  const isQualified = secureLocalStorage.getItem("user").team_qualified;
  const userRole = secureLocalStorage.getItem("user_role");
  const [isLeader, setIsLeader] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const decodedTeam = secureLocalStorage.getItem("team");
    const decodedUser = secureLocalStorage.getItem("user").etudiant;

    if (decodedTeam && decodedUser) {
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
        <div className="md:px-9 lg:mt-4 background-p">
          <nav className="lg:bg-gray-100 rounded-full dark:bg-gray-900">
            <div className="flex flex-nowrap justify-between items-center mx-auto p-4">
              <a
                href="#"
                className="flex items-center space-x-3 rtl:space-x-reverse"
              >
                <img src={logo} className="h-11" alt="SDI" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap text-black">
                  SDI
                </span>
              </a>
              <nav className="bg-gray-100 hidden lg:flex dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                  <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-[14px]">
                      <li>
                        <Link
                          to="/hackathon/administration/UsersScreen"
                          className="text-black barre font-bold text-[14px]"
                          aria-current="page"
                        >
                          Espace
                        </Link>
                      </li>
                      {userRole === "admin" ? (
                        <li>
                          <Link
                            to="/hackathon/administration/SettingsView"
                            className="text-black barre font-bold text-[14px]"
                            aria-current="page"
                          >
                            Paramétrage
                          </Link>
                        </li>
                      ) : null}
                      {userRole !== "admin" && isLeader ? (
                        <li>
                          <Link
                            to="/hackathon/administration/PreselectionView"
                            className="text-black barre font-bold text-[14px]"
                            aria-current="page"
                          >
                            Présélection
                          </Link>
                        </li>
                      ) : null}
                      {userRole !== "admin" && isQualified ? (
                        <li>
                          <Link
                            to="/hackathon/administration/Restauration-for-participant"
                            className="text-black barre font-bold text-[14px]"
                            aria-current="page"
                          >
                            Restauration
                          </Link>
                        </li>
                      ) : null}
                      {userRole === "admin" ? (
                        <li>
                          <Link
                            to="/hackathon/administration/TeamsView"
                            className="text-black barre font-bold text-[14px]"
                          >
                            Groupes
                          </Link>
                        </li>
                      ) : null}
                      {userRole === "admin" ? (
                        <li>
                          <Link
                            to="/hackathon/administration/PrintView"
                            className="text-black barre font-bold text-[14px]"
                          >
                            Impression
                          </Link>
                        </li>
                      ) : null}
                      {userRole === "admin" ? (
                        <li>
                          <Link
                            to="/hackathon/administration/RestaurantView"
                            className="text-black barre font-bold text-[14px]"
                          >
                            Restauration
                          </Link>
                        </li>
                      ) : null}
                      {userRole === "admin" ? (
                        <li>
                          <Link
                            to="/hackathon/game/rank"
                            className="text-black barre font-bold text-[14px]"
                          >
                            Quiz
                          </Link>
                        </li>
                      ) : null}
                    </ul>
                  </div>
                </div>
              </nav>
              <div className="flex items-center text-[14px]">
                <Button
                  onClick={toggleDrawer}
                  isDisable={false}
                  isReady={true}
                  label={
                    userRole === "admin" ? "Administrateur" : "Participant"
                  }
                />
                <Drawer
                  open={isOpen}
                  onClose={toggleDrawer}
                  direction="right"
                  className=""
                >
                  <div className="py-4 px-2 h-full bg-white">
                    <h2 className="mb-4 text-xl font-bold text-[#F94C10]">
                      Paramètres
                    </h2>
                    <ul className="space-y-2 font-medium text-[14px]">
                      <li>
                        <a
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-[#F1F1F1] hover:bg-gray-100 duration-300 dark:hover:bg-gray-700 group"
                        >
                          <FontAwesomeIcon
                            className="text-gray-400 text-md"
                            icon={faCircleInfo}
                          />
                          <span className="flex-1 ms-3 text-gray-700 whitespace-nowrap text-[14px] hover:text-orange-500">
                            Gestion de mon espace
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-[#F1F1F1] hover:bg-gray-100 hover:text-[#F94C10] duration-300 dark:hover:bg-gray-700 group"
                        >
                          <FontAwesomeIcon
                            className="text-gray-400 text-md"
                            icon={faUserSecret}
                          />
                          <span className="flex-1 text-gray-700 ms-3 whitespace-nowrap text-[14px] hover:text-orange-500">
                            Mes informations
                          </span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          onClick={() => {
                            setIsReady(false);
                            handleServiceLogOut().then((result) => {
                              setIsReady(true);
                              if (result) {
                                navigate("/");
                              }
                            });
                          }}
                          className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white bg-[#F1F1F1] hover:bg-gray-100 hover:text-[#F94C10] duration-300 dark:hover:bg-gray-700 group"
                        >
                          <FontAwesomeIcon
                            className="text-gray-400 text-md"
                            icon={faArrowRightFromBracket}
                          />
                          <span className="flex-1 ms-3 text-gray-700 whitespace-nowrap text-[14px] hover:text-orange-500">
                            Se déconnecter
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </Drawer>
              </div>
            </div>
          </nav>
          <nav className="lg:hidden bg-gray-100 dark:bg-gray-200">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
              <div className="">
                <ul className="flex gap-4 items-start flex-wrap font-medium mt-0 rtl:space-x-reverse text-sm">
                  <li>
                    <Link
                      to="/hackathon/administration/UsersScreen"
                      className="text-black barre font-bold"
                      aria-current="page"
                    >
                      Espace
                    </Link>
                  </li>
                  {userRole !== "admin" && isLeader ? (
                    <li>
                      <Link
                        to="/hackathon/administration/PreselectionView"
                        className="text-black barre font-bold text-[14px]"
                        aria-current="page"
                      >
                        Présélection
                      </Link>
                    </li>
                  ) : null}
                  {userRole !== "admin" && isQualified ? (
                    <li>
                      <Link
                        to="/hackathon/administration/Restauration-for-participant"
                        className="text-black barre font-bold text-[14px]"
                        aria-current="page"
                      >
                        Restauration
                      </Link>
                    </li>
                  ) : null}
                  {userRole === "admin" ? (
                    <li>
                      <Link
                        to="/hackathon/administration/SettingsView"
                        className="text-black barre font-bold text-[14px]"
                        aria-current="page"
                      >
                        Paramétrage
                      </Link>
                    </li>
                  ) : null}
                  {userRole === "admin" ? (
                    <li>
                      <Link
                        to="/hackathon/administration/TeamsView"
                        className="text-black barre font-bold text-[14px]"
                      >
                        Groupes
                      </Link>
                    </li>
                  ) : null}
                  {userRole === "admin" ? (
                    <li>
                      <Link
                        to="/hackathon/administration/PrintView"
                        className="text-black barre font-bold text-[14px]"
                      >
                        Impression
                      </Link>
                    </li>
                  ) : null}
                  {userRole === "admin" ? (
                    <li>
                      <Link
                        to="/hackathon/administration/RestaurantView"
                        className="text-black barre font-bold text-[14px]"
                      >
                        Restauration
                      </Link>
                    </li>
                  ) : null}
                  {userRole === "admin" ? (
                    <li>
                      <Link
                        to="/hackathon/game/rank"
                        className="text-black barre font-bold text-[14px]"
                      >
                        Quiz
                      </Link>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={!isReady} />
        </div>
      )}
    </div>
  );
}
