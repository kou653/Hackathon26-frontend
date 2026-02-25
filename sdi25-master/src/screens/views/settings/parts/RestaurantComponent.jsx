import { PaginatedItems } from "../../../../components/PageIndicator";
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { notify } from "../../../../components/toast/toast.tsx";

import InputField from "../../../../components/ui/InputField.tsx";
import Labelui from "../../../../components/ui/labelui.tsx";
import Button from "../../../../components/ui/ButtonUi.tsx";
import {
  handleServiceCreateDrink,
  handleServiceCreateFood,
  handleServiceDeleteCollation,
  handleServiceDeleteFood,
  handleServiceGetMeal,
} from "../../../../services/restaurantService.tsx";

export default function RestaurantComponent() {
  // variable du loader
  const [isLoading, setIsLoading] = useState(false);
  const [deleted, setDeleted] = useState();
  const [objectId, setObjectId] = useState("");

  // variables des input
  const [foodValue, setFoodValue] = useState("");
  const handleFoodChange = (event) => {
    setFoodValue(event.target.value);
  };

  const [drinkValue, setDrinkValue] = useState("");
  const handleDrinkChange = (event) => {
    setDrinkValue(event.target.value);
  };

  // liste des plats
  const [foodList, setFoodList] = useState([]);

  // liste des collations
  const [drinkList, setDrinkList] = useState([]);

  // variables du tableau

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
          Options
        </th>
      </tr>
    );
  }

  function Items1({ currentItems }) {
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
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.libelle}</td>
              <td className="px-6 text-[#F94C10]">
                <button onClick={() => handleOpen(item.id, 1)}>éditer.</button>
              </td>
            </tr>
          ))}
      </>
    );
  }

  function Items2({ currentItems }) {
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
                {index + 1}
              </th>
              <td className="px-6 py-4">{item.libelle}</td>
              <td className="px-6 text-[#F94C10]">
                <button onClick={() => handleOpen(item.id, 2)}>éditer.</button>
              </td>
            </tr>
          ))}
      </>
    );
  }

  // variables du modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = (id, type) => {
    setObjectId(id);
    setDeleted(type);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // style du modal
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

  // fonctions de récupération

  useEffect(() => {
    getFullDataList();
  }, []);

  function getFullDataList() {
    setIsLoading(true);
    handleServiceGetMeal().then((result) => {
      if (result) {
        setFoodList(result.repas);
        setDrinkList(result.collations);
      }
      setIsLoading(false);
    });
  }

  // fonctions de soumission

  const handleFoodSubmit = async (event) => {
    event.preventDefault();
    const libelle = foodValue.trim();
    if (!libelle) {
      notify("error", "Veuillez renseigner le nom du plat");
      return;
    }
    setIsLoading(true);

    const newFood = {
      libelle,
    };

    const result = await handleServiceCreateFood(newFood);
    if (result) setFoodValue("");

    getFullDataList();
    setIsLoading(false);
  };

  const handleDrinkSubmit = async (event) => {
    event.preventDefault();
    const libelle = drinkValue.trim();
    if (!libelle) {
      notify("error", "Veuillez renseigner le nom de la collation");
      return;
    }
    setIsLoading(true);

    const newDrink = {
      libelle,
    };

    const result = await handleServiceCreateDrink(newDrink);
    if (result) setDrinkValue("");

    getFullDataList();
    setIsLoading(false);
  };

  // fonction de suppression

  const handleDeleteMenu = async () => {
    setIsLoading(true);

    if (deleted === 1) {
      const foodToDelete = {
        repasId: objectId,
      };
      await handleServiceDeleteFood(foodToDelete);
    } else {
      const collationToDelete = {
        collationId: objectId,
      };
      await handleServiceDeleteCollation(collationToDelete);
    }

    handleClose();
    getFullDataList();
    setIsLoading(false);
  };

  return (
    <div>
      {!isLoading ? (
        <div className="lg:flex lg:justify-between md:gap-4">
          <div className="md:w-2/5 max-w-sm dark:bg-gray-800 dark:border-gray-700">
            <h5 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Enregistrez un repas
            </h5>
            <form
              onSubmit={handleFoodSubmit}
              className="flex flex-col gap-4 mb-9"
              action="#"
            >
              <Labelui label="Nom du plat" />
              <InputField
                type="text"
                placeholder="Attiéké..."
                value={foodValue}
                onChange={handleFoodChange}
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
            <h5 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
              Enregistrez une collation
            </h5>
            <form
              onSubmit={handleDrinkSubmit}
              className="flex flex-col gap-4 mb-9"
              action="#"
            >
              <Labelui label="Nom de la collation" />
              <InputField
                type="text"
                placeholder="Café..."
                value={drinkValue}
                onChange={handleDrinkChange}
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
                <form action="#">
                  <div className="my-4">
                    <form onSubmit={handleDeleteMenu} action="#">
                      <Button
                        label="Supprimer le menu"
                        onClick={() => handleDeleteMenu()}
                        type="button"
                        isDisable={false}
                        isReady={true}
                        isLoading={isLoading}
                      />
                    </form>
                  </div>
                </form>
              </Box>
            </Modal>
          </div>
          <div className="lg:w-3/5 lg:mt-0 mt-4" id="container">
            <PaginatedItems
              itemsPerPage={4}
              item={foodList}
              Items={Items1}
              tableHeader={TableHeader}
            />
            <PaginatedItems
              itemsPerPage={4}
              item={drinkList}
              Items={Items2}
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
