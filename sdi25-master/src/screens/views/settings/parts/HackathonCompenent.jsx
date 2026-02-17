import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseListYear } from "../../../../models/niveau";
import HashLoader from "react-spinners/HashLoader";

import { getOptionLabel } from "../../../../helpers/select/SelectHelper.tsx";

import InputField from "../../../../components/ui/InputField.tsx";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";

import { useState, useEffect } from "react";
import React from "react";
import {
  handleServiceCreateHackathon,
  handleServiceGetHackathonList,
  handleServiceToggleHackathon,
} from "../../../../services/hackathonService.tsx";

export default function HackathonCompenent() {
  const [yearValue, setYearValue] = useState(1);
  const [hackathonList, setHackathonList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const listYear = baseListYear;
  const handleYearChange = (selectedOption) => {
    setYearValue(selectedOption.value);
  };

  const [pco1, setPco1] = useState("");
  const handlePco1Change = (event) => {
    setPco1(event.target.value);
  };

  const [pco2, setPco2] = useState("");
  const handlePco2Change = (event) => {
    setPco2(event.target.value);
  };

  useEffect(() => {
    getHackathonList();
  }, []);

  function getHackathonList() {
    setIsLoading(true);

    handleServiceGetHackathonList()
      .then((data) => {
        // Sécurité ABSOLUE
        if (data && data.data) {
          setHackathonList(data.data);
        } else {
          setHackathonList([]);
        }
      })
      .catch((error) => {
        console.error("Erreur chargement hackathon :", error);
        setHackathonList([]);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const hackathon = {
      pco_1: pco1,
      pco_2: pco2,
      annee: getOptionLabel(listYear, yearValue),
    };

    handleServiceCreateHackathon(hackathon).then((result) => {
      setIsLoading(false);
      if (result) {
        getHackathonList();
      }
    });
  };

  const handleToggleHackathon = (id) => {
    const data = {
      hackathonId: id,
    };

    handleServiceToggleHackathon(data).then((result) => {
      if (result) {
        getHackathonList();
      }
    });
  };

  return (
    <div>
      {!isLoading ? (
        <div className="lg:flex lg:justify-between md:gap-4">
          <div className="md:w-2/5 max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl mb-3 font-bold text-gray-900 dark:text-white calSans">
              Créer un hackathon
            </h5>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-9"
              action="#"
            >
              <Labelui label="Nom du PCO 1" />
              <InputField
                onClick={() => {
                  return;
                }}
                onChange={handlePco1Change}
                value={pco1}
                placeholder="pco_1"
                type="text"
              />
              <Labelui label="Nom du PCO 2" />
              <InputField
                onClick={() => {
                  return;
                }}
                onChange={handlePco2Change}
                value={pco2}
                placeholder="pco_2"
                type="text"
              />
              <Labelui label="Année d'enregistrement" />
              <SelectUi
                placeholder="Choisissez"
                options={listYear}
                filterValue={yearValue}
                onChange={handleYearChange}
              />
              <div className="my-3">
                <Button
                  label="Enregistrer"
                  type="submit"
                  isDisable={false}
                  isReady={true}
                  isLoading={isLoading}
                />
              </div>
            </form>
          </div>

          <div className="md:w-3/5 md:mt-0 mt-6">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Année
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Nom & Prénom des PCO
                    </th>
                    <th scope="col" className="px-2 py-3">
                      Actuel
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hackathonList.map((element) => (
                    <tr
                      key={element.id}
                      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {element.annee}
                      </th>
                      <td className="px-6 py-4">
                        {element.pco_1} <br /> {element.pco_2}
                      </td>

                      <td
                        className={`px-6 py-4 ${
                          element.inscription === 1 ? "bg-[#F94C10]" : "bg-gray-200"
                        }`}
                      >
                        <button
                          onClick={() => handleToggleHackathon(element.id)}
                          className="w-full pt-2 flex justify-center"
                        >
                          <FontAwesomeIcon
                            className={`text-2xl ${
                              element.inscription === 1 ? "text-white" : "text-black"
                            }`}
                            icon={element.inscription === 1 ? faCheck : faXmark}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={isLoading} />
        </div>
      )}
    </div>
  );
}
