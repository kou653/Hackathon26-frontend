import React, { useEffect, useState } from "react";
import Button from "../../components/ui/ButtonUi.tsx";
import Swal from "sweetalert2";
import api from "../../services/axios";
import { notify } from "../../components/toast/toast.tsx";
import { handleServiceQualifyTeam } from "../../services/PreselectionService.tsx";

type Team = {
  id: number;
  nom: string;
};

type LevelConfig = {
  id: number;
  label: string;
};

export default function PrintView() {
  const apiBaseUrl = process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "/api";
  const levelConfigs: LevelConfig[] = [
    { id: 1, label: "Equipes de niveau 1" },
    { id: 2, label: "Equipes de niveau 2 Devloppement" },
    { id: 3, label: "Equipes de niveau 2 Réseau & Telecom" },
    { id: 6, label: "Equipes de niveau 3 Sécurité" },
    { id: 4, label: "Equipes de niveau 3 Developpement" },
    { id: 5, label: "Equipes de niveau 3 Réseau & Telecom" },
  ];

  const [selectedTeamsByLevel, setSelectedTeamsByLevel] = useState<
    Record<number, Team[]>
  >({});
  const [isLoadingTeams, setIsLoadingTeams] = useState(false);

  const fetchSelectedTeams = async () => {
    setIsLoadingTeams(true);
    try {
      const entries = await Promise.all(
        levelConfigs.map(async (level) => {
          const response = await api.post("/groupe/render", {
            statut: 1,
            niveauId: level.id,
          });
          const teams = response.data?.status
            ? (response.data?.data?.equipes ?? [])
            : [];
          return [level.id, teams] as const;
        })
      );

      setSelectedTeamsByLevel(Object.fromEntries(entries));
    } catch (error) {
      notify("error", "Impossible de charger les équipes sélectionnées");
    } finally {
      setIsLoadingTeams(false);
    }
  };

  useEffect(() => {
    fetchSelectedTeams();
  }, []);

  const handleRemoveFromSelection = (team: Team) => {
    Swal.fire({
      title: "Retirer de la sélection",
      text: `Retirer l'équipe ${team.nom} de la liste à imprimer ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Retirer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const ok = await handleServiceQualifyTeam({ equipeId: team.id });
        if (ok) {
          Swal.fire({
            title: "Mis à jour",
            text: `${team.nom} a été retirée de la sélection.`,
            icon: "success",
          });
          fetchSelectedTeams();
        }
      }
    });
  };

  return (
    <div className="md:p-9 p-4">
      <p>IMPRESSION DES LISTES D&apos;EQUIPES SELECTIONNEES</p>
      <div className="flex gap-4 flex-wrap mt-6">
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Equipes de niveau 1</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/1`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Equipes de niveau 2 Devloppement</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/2`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col p-4 gap-4 bg-gray-100 rounded-lg">
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Equipes de niveau 2 Réseau & Telecom</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/3`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Equipes de niveau 3 Sécurité</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/6`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gray-100 rounded-lg p-4">
          <div className="flex gap-4 items-center flex-1">
            <p>Equipes de niveau 3 Developpement</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/4`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
          <div className="flex gap-4 items-center flex-1">
            <p>Equipes de niveau 3 Réseau & Telecom</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/selectedteam/5`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-6 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"></div>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <p>GESTION DES EQUIPES SELECTIONNEES A IMPRIMER</p>
          <div className="max-w-[140px]">
            <Button
              onClick={() => fetchSelectedTeams()}
              label="Actualiser"
              isDisable={false}
              isReady={true}
              isLoading={false}
              type="button"
            />
          </div>
        </div>

        {isLoadingTeams ? (
          <p className="mt-4 text-gray-500">Chargement des équipes...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            {levelConfigs.map((level) => {
              const teams = selectedTeamsByLevel[level.id] ?? [];
              return (
                <div key={level.id} className="bg-gray-100 rounded-lg p-4">
                  <p className="font-semibold text-gray-700">{level.label}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {teams.length} équipe(s) sélectionnée(s)
                  </p>
                  <div className="mt-3 space-y-2">
                    {teams.length > 0 ? (
                      teams.map((team) => (
                        <div
                          key={team.id}
                          className="bg-white rounded-lg p-3 flex items-center justify-between gap-3"
                        >
                          <p className="text-sm text-gray-700">{team.nom}</p>
                          <button
                            onClick={() => handleRemoveFromSelection(team)}
                            type="button"
                            className="text-xs font-medium text-red-600 bg-red-100 px-3 py-1 rounded-md"
                          >
                            Retirer
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Aucune équipe sélectionnée.
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="w-full mt-6 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700"></div>

      <p className="mt-6">IMPRESSION DES FICHES</p>
      <div className="flex gap-4 flex-wrap mt-6">
        <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Rep. Equipe par Salle</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/repartition`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
          <div className="flex justify-between gap-4 items-center flex-1">
            <p>Commandes Collation</p>
            <div className="max-w-lg">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiBaseUrl}/pdf/commandes`}
              >
                <Button
                  onClick={() => {
                    return null;
                  }}
                  label="Imprimer"
                  isDisable={false}
                  isReady={true}
                  isLoading={false}
                  type={undefined}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
