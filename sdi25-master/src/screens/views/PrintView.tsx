import React from "react";
import Button from "../../components/ui/ButtonUi.tsx";

export default function PrintView() {
  const apiBaseUrl = process.env.REACT_APP_API_URL
    ? `${process.env.REACT_APP_API_URL}/api`
    : "/api";
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
