import { PaginatedItems } from "../../../../components/PageIndicator.jsx";
import HashLoader from "react-spinners/HashLoader";
import { useState, useEffect } from "react";
import React from "react";

import InputField from "../../../../components/ui/InputField.tsx";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";

import { handleServiceGetClassList } from "../../../../services/ConstantsService.tsx";
import {
  handleServiceCreateClass,
  handleServiceDeleteClass,
  handleServiceUpdateClass,
} from "../../../../services/hackathonService.tsx";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import { getOptionValue } from "../../../../helpers/select/SelectHelper.tsx";

export default function LevelComponent() {
  const [isLoading, setIsLoading] = useState(false);

  const [classId, setClassId] = useState("");

  // variable pour la checkbox niveau de l'esatic ?
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const [levelValue, setLevelValue] = useState(0);
  const [levelList, setLevelList] = useState([]);
  const handleLevelListChange = (selectedOption) => {
    setLevelValue(selectedOption.value);
  };

  const [classList, setClassList] = useState([]);

  const [classValue, setClassValue] = useState("");
  const handleClassChange = (event) => {
    setClassValue(event.target.value);
  };

  const [updateLevelValue, setUpdateLevelValue] = useState(0);
  const handleUpdateLevelListChange = (selectedOption) => {
    setUpdateLevelValue(selectedOption.value);
  };

  const [updateClassValue, setUpdateClassValue] = useState("");
  const handleUpdateClassChange = (event) => {
    setUpdateClassValue(event.target.value);
  };

  // modal variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = (niveau, classe, classeId, isEsatic) => {
    setUpdateLevelValue(getOptionValue(levelList, niveau));
    setIsUpdateChecked(isEsatic);
    setUpdateClassValue(classe);
    setClassId(classeId);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 0,
    p: 4,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  };

  // load data
  useEffect(() => {
    getClassList();
  }, []);

  function getClassList() {
    setIsLoading(true);
    handleServiceGetClassList().then((result) => {
      if (result) {
        setClassList(result.classes);

        const temp = result.niveaux.map((item) => ({
          value: item.id,
          label: item.libelle,
        }));

        setLevelList(temp);
        setIsLoading(false);
      }
    });
  }

  function TableHeader() {
    return (
      <tr>
        <th scope="col" className="px-6 py-3">
          Niveau
        </th>
        <th scope="col" className="px-6 py-3">
          Classe
        </th>
        <th scope="col" className="px-6 py-3">
          Option
        </th>
      </tr>
    );
  }

  function Items({ currentItems }) {
    return (
      <>
        {currentItems &&
          currentItems.map((item, index) => (
            <tr
              key={index}
              className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.niveau?.libelle ?? "Niveau non defini"}
              </th>
              <td className="px-6 py-4">{item.libelle}</td>
              <td className="px-6 text-[#F94C10]">
                <button
                  onClick={() =>
                    handleOpen(
                      item.niveau?.libelle ?? "",
                      item.libelle ?? "",
                      item.id,
                      item.esatic
                    )
                  }
                >
                  éditer.
                </button>
              </td>
            </tr>
          ))}
      </>
    );
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const newClass = {
      libelle: classValue,
      niveau_id: levelValue,
      isEsatic: isChecked === true ? 1 : 0,
    };

    try {
      handleServiceCreateClass(newClass).then((result) => {
        setIsLoading(false);
        if (result) {
          getClassList();
        }
      });
    } catch {
      setIsLoading(false);
    }
  };

  // variable pour la checkbox niveau de l'esatic ?
  const [isUpdateChecked, setIsUpdateChecked] = useState(false);
  const handleCheckboxUpdateChange = (event) => {
    setIsUpdateChecked(event.target.checked);
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    const updateClass = {
      libelle: updateClassValue,
      niveau_id: updateLevelValue,
      classeId: classId,
      isEsatic: isUpdateChecked ? 1 : 0,
    };

    handleServiceUpdateClass(updateClass).then((result) => {
      if (result) {
        getClassList();
      }
    });
  };

  const handleDeleteClass = () => {
    setIsLoading(true);

    const data = {
      classeId: classId,
    };

    handleServiceDeleteClass(data).then((result) => {
      if (result) {
        handleClose();
        getClassList();
      }
    });
  };

  return (
    <div>
      {!isLoading ? (
        <div className="lg:flex lg:justify-between md:gap-4">
          <div className="md:w-2/5 max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Enregistrez une classe
            </h5>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mb-9"
              action="#"
            >
              <div className="flex items-center gap-4">
                <input
                  value={isChecked}
                  onChange={handleCheckboxChange}
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
                <p>Pour les étudiants de lESATIC ?</p>
              </div>
              <Labelui label="Libelle de la classe" />
              <InputField
                onClick={() => {return;}}
                onChange={handleClassChange}
                value={classValue}
                placeholder="libelle de la classe"
                type="text"
              />
              <Labelui label="Niveau" />
              <SelectUi
                placeholder="Choisissez"
                options={levelList}
                filterValue={levelValue}
                onChange={handleLevelListChange}
              />
              <div className="my-4">
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
          <div>
            <Modal
              className="bg-[rgb(255,255,255,.10)]"
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form onSubmit={handleUpdateSubmit} action="#">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input
                        value={isUpdateChecked}
                        onChange={handleCheckboxUpdateChange}
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                      />
                      <p>Pour les étudiants de l&apos;ESATIC ?</p>
                    </div>
                    <Labelui label="Libelle de la classe" />
                    <InputField
                      onClick={() => {return;}}
                      onChange={handleUpdateClassChange}
                      value={updateClassValue}
                      placeholder="libelle de la classe"
                      type="text"
                    />
                    <Labelui label="Niveau" />
                    <SelectUi
                      placeholder="Choisissez"
                      options={levelList}
                      filterValue={updateLevelValue}
                      onChange={handleUpdateLevelListChange}
                    />
                    <div className="my-4">
                      <Button
                        label="Enregistrer"
                        type="submit"
                        isDisable={false}
                        isReady={true}
                        isLoading={isLoading}
                      />
                    </div>
                  </div>
                </form>
                <Divider />
                <form action="#">
                  <div className="my-4">
                    <Button
                      label="Supprimer la classe"
                      onClick={() => handleDeleteClass()}
                      type="button"
                      isDisable={false}
                      isReady={true}
                      isLoading={isLoading}
                    />
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
          <div className="lg:w-3/5 lg:mt-0 mt-4" id="container">
            <PaginatedItems
              itemsPerPage={4}
              item={classList}
              Items={Items}
              tableHeader={TableHeader}
            />
          </div>
        </div>
      ) : (
        <div
          id="container"
          className="h-screen w-full flex justify-center items-center"
        >
          <HashLoader size={60} color="#F94C10" loading={isLoading} />
        </div>
      )}
    </div>
  );
}
