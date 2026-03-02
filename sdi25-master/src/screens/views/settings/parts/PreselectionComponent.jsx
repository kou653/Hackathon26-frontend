import {
  handleServiceChangeQuizState,
  handleServiceCreateAnswer,
  handleServiceCreateQuestion,
  handleServiceDeleteAnswer,
  handleServiceDeleteQuestion,
  handleServiceGetCurrentQuiz,
  handleServiceUpdateQuestion,
} from "../../../../services/PreselectionService.tsx";
import { handleServiceGetLevelsList } from "../../../../services/ConstantsService.tsx";
import InputField from "../../../../components/ui/InputField.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SelectUi from "../../../../components/ui/SelectUi.tsx";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../components/ui/ButtonUi.tsx";
import HashLoader from "react-spinners/HashLoader";
import { useEffect, useState } from "react";
import { Accordion } from "flowbite-react";
import Swal from "sweetalert2";
import React from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import Labelui from "../../../../components/ui/labelui.tsx";

export default function PreselectionComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizList, setQuizList] = useState([]);

  // variables for level select ----->
  const [levelValue, setLevelValue] = useState(0);
  const [levelList, setLevelList] = useState([]);
  const handleChangeLevel = (selectedOption) => {
    setLevelValue(selectedOption.value);
  };

  // variables for question answer ----->
  const [answersValue, setAnswersValue] = useState([]);
  const handleChangeAnswersValue = (event, index) => {
    const newlist = [...answersValue];
    newlist[index] = event.target.value;
    setAnswersValue(newlist);
  };

  // variables for question answer ----->
  const [answerScoresValue, setAnswersScoreValue] = useState([]);
  const handleChangeAnswerScoreValue = (event, index) => {
    const newlist = [...answerScoresValue];
    newlist[index] = event.target.value;
    setAnswersScoreValue(newlist);
  };

  // variables for question score ----->
  const [questionValue, setQuestionValue] = useState("");
  const handleChangeQuestionValue = (event) => {
    setQuestionValue(event.target.value);
  };

  // variables for bulk import ----->
  const [bulkQuestionsValue, setBulkQuestionsValue] = useState("");
  const [replaceExistingQuestions, setReplaceExistingQuestions] = useState(true);

  // function to get current quiz for a specific level
  const [quizState, setQuizState] = useState(null);
  const [score, setScore] = useState(0);
  const handleGetCurrentQuiz = async () => {
    setIsLoading(true);
    const data = {
      niveauId: levelValue,
    };
    await handleServiceGetCurrentQuiz(data).then((result) => {
      setQuizState(result.quiz_state);
      setScore(result.quiz_score);
      setQuizList(result.questions || []);
      setIsLoading(false);
    });
  };

  const ensureLevelSelected = () => {
    if (!levelValue || Number(levelValue) === 0) {
      Swal.fire({
        title: "Niveau requis",
        text: "Choisissez un niveau avant de continuer.",
        icon: "warning",
      });
      return false;
    }
    return true;
  };

  const parseBulkQuestions = (rawInput) => {
    const lines = rawInput
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean);

    const parsed = [];

    lines.forEach((line, index) => {
      const parts = line
        .split(";")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts.length < 3) {
        throw new Error(
          `Ligne ${index + 1} invalide. Format attendu: Question ; Reponse 1* ; Reponse 2 ; Reponse 3`
        );
      }

      const question = parts[0];
      const answers = parts.slice(1).map((answer) => {
        const isCorrect = answer.includes("*");
        return {
          content: answer.replace(/\*/g, "").trim(),
          score: isCorrect ? 1 : 0,
        };
      });

      if (!answers.some((answer) => answer.score > 0)) {
        answers[0].score = 1;
      }

      parsed.push({ question, answers });
    });

    return parsed;
  };

  const handleDeleteAllQuestions = async () => {
    if (!ensureLevelSelected()) return;

    const confirm = await Swal.fire({
      title: "Supprimer toutes les questions ?",
      text: "Cette action supprimera toutes les questions et leurs reponses du niveau selectionne.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Oui, supprimer",
      cancelButtonText: "Annuler",
    });

    if (!confirm.isConfirmed) return;

    setIsLoading(true);
    const current = await handleServiceGetCurrentQuiz({ niveauId: levelValue });
    const list = current?.questions || [];

    for (const question of list) {
      await handleServiceDeleteQuestion({ questionId: question.id });
    }

    await handleGetCurrentQuiz();
    setIsLoading(false);

    Swal.fire({
      title: "Termine",
      text: `${list.length} question(s) supprimee(s).`,
      icon: "success",
    });
  };

  const handleBulkImportQuestions = async () => {
    if (!ensureLevelSelected()) return;

    let parsed;
    try {
      parsed = parseBulkQuestions(bulkQuestionsValue);
    } catch (error) {
      Swal.fire({
        title: "Import invalide",
        text: error.message,
        icon: "error",
      });
      return;
    }

    if (parsed.length === 0) {
      Swal.fire({
        title: "Aucune question",
        text: "Collez au moins une ligne avant d'importer.",
        icon: "warning",
      });
      return;
    }

    const confirm = await Swal.fire({
      title: "Importer les questions ?",
      html: `Vous allez importer <b>${parsed.length}</b> question(s).`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Importer",
      cancelButtonText: "Annuler",
    });

    if (!confirm.isConfirmed) return;

    setIsLoading(true);

    let knownIds = new Set(quizList.map((item) => item.id));

    if (replaceExistingQuestions) {
      for (const existing of quizList) {
        await handleServiceDeleteQuestion({ questionId: existing.id });
      }
      knownIds = new Set();
    }

    let importedCount = 0;
    const errors = [];

    for (const item of parsed) {
      const created = await handleServiceCreateQuestion({
        niveauId: levelValue,
        question: item.question,
      });

      if (!created) {
        errors.push(`Question non creee: ${item.question}`);
        continue;
      }

      const refreshed = await handleServiceGetCurrentQuiz({ niveauId: levelValue });
      const refreshedQuestions = refreshed?.questions || [];

      const newQuestion =
        refreshedQuestions.find(
          (question) =>
            !knownIds.has(question.id) &&
            question.content?.trim() === item.question.trim()
        ) || refreshedQuestions.find((question) => !knownIds.has(question.id));

      if (!newQuestion) {
        errors.push(`Question introuvable apres creation: ${item.question}`);
        continue;
      }

      knownIds.add(newQuestion.id);

      for (const answer of item.answers) {
        await handleServiceCreateAnswer({
          niveauId: levelValue,
          questionId: newQuestion.id,
          response: answer.content,
          score: answer.score,
        });
      }

      importedCount += 1;
    }

    setBulkQuestionsValue("");
    await handleGetCurrentQuiz();
    setIsLoading(false);

    if (errors.length > 0) {
      Swal.fire({
        title: "Import partiel",
        html: `${importedCount} question(s) importee(s).<br/>${errors.length} erreur(s).`,
        icon: "warning",
      });
      return;
    }

    Swal.fire({
      title: "Import termine",
      text: `${importedCount} question(s) importee(s) avec succes.`,
      icon: "success",
    });
  };

  // function to add a question for the quiz of a specific level
  const handleCreateQuizQuestion = async () => {
    if (!ensureLevelSelected()) return;

    setIsLoading(true);
    const data = {
      niveauId: levelValue,
      question: questionValue,
    };
    await handleServiceCreateQuestion(data);
    setQuestionValue("");
    await handleGetCurrentQuiz();
    setIsLoading(false);
  };

  // function to add a question for the quiz of a specific level
  const handleCreateAnswer = async (id, index) => {
    setIsLoading(true);

    const data = {
      niveauId: levelValue,
      questionId: id,
      response: answersValue[index],
      score: answerScoresValue[index],
    };

    await handleServiceCreateAnswer(data);

    const newAnswers = [...answersValue];
    const newScores = [...answerScoresValue];

    newAnswers[index] = "";
    newScores[index] = "";

    setAnswersValue(newAnswers);
    setAnswersScoreValue(newScores);

    await handleGetCurrentQuiz();
    setIsLoading(false);
  };

  // fonction to delete an answer
  const handleDeleteAnswer = (id) => {
    Swal.fire({
      title: "Supprimer",
      text: "Etes-vous sur de supprimer cette reponse ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          responseId: id,
        };
        await handleServiceDeleteAnswer(data);
        if (data) {
          Swal.fire({
            title: "Supprime !",
            text: "Reponse supprimee avec succes",
            icon: "success",
          });
        }

        await handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  // fonction to delete a question
  const handleDeleteQuestion = () => {
    handleClose();
    Swal.fire({
      title: "Supprimer",
      text: "Etes-vous sur de vouloir supprimer cette question ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          questionId: item.id,
        };
        await handleServiceDeleteQuestion(data);
        if (data) {
          Swal.fire({
            title: "Supprime !",
            text: "Question supprimee avec succes",
            icon: "success",
          });
        }

        await handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  const handleUpdateQuestion = () => {
    handleClose();
    Swal.fire({
      title: "Mise a jour",
      text: "Etes-vous sur de vouloir mettre a jour cette question ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#265073",
      cancelButtonColor: "#C7C8CC",
      confirmButtonText: "Mettre a jour",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const data = {
          question: updateQuestionValue,
          questionId: item.id,
        };
        await handleServiceUpdateQuestion(data);
        if (data) {
          Swal.fire({
            title: "Mise a jour !",
            text: "Question mise a jour avec succes",
            icon: "success",
          });
        }

        await handleGetCurrentQuiz();
        setIsLoading(false);
      }
    });
  };

  const [item, setItem] = useState();

  const [updateQuestionValue, setUpdateQuestionValue] = useState();
  const handleChangeUpdateQuestionValue = (event) => {
    setUpdateQuestionValue(event.target.value);
  };

  // modal variables
  const [open, setOpen] = React.useState(false);
  const handleOpen = (item) => {
    setUpdateQuestionValue(item.content);
    setItem(item);
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

  const handleChangeQuizStatus = async () => {
    const data = {
      quizId: levelValue,
    };
    await handleServiceChangeQuizState(data);
    handleGetCurrentQuiz();
  };

  useEffect(() => {
    setIsLoading(true);
    handleServiceGetLevelsList({ esatic: 1 }).then((result) => {
      const temp = result.niveaux.map((item) => ({
        value: item.id,
        label: item.libelle,
      }));
      setLevelList(temp);
      setIsLoading(false);
    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        <div className="w-full">
          <div className="lg:flex lg:flex-row flex-col justify-between w-full gap-9">
            <div className="flex flex-col mt-6 space-y-6 lg:w-2/5 w-full">
              <p className="text-lg">
                <span className="font-bold text-[#F94C10]">Score : </span> {score}
                pt(s)
              </p>
              <div className="mt-11">
                <div className="flex flex-col gap-4 my-8">
                  <SelectUi
                    placeholder="Choisissez"
                    options={levelList}
                    filterValue={levelValue}
                    onChange={handleChangeLevel}
                  />
                  <Button
                    onClick={() => handleGetCurrentQuiz()}
                    type="button"
                    label="Recuperer le quiz"
                    isReady={true}
                    isLoading={false}
                  />
                  <Button
                    onClick={() => handleChangeQuizStatus()}
                    type="submit"
                    label={quizState === 0 ? "Ouvrir le quiz" : "Fermer le quiz"}
                    isReady={true}
                    isLoading={false}
                  />
                  <div className="mt-6"></div>
                  <InputField
                    onClick={() => {
                      return;
                    }}
                    type="text"
                    placeholder="Nouvelle question..."
                    value={questionValue}
                    onChange={handleChangeQuestionValue}
                  />
                </div>
                <Button
                  onClick={() => handleCreateQuizQuestion()}
                  type="submit"
                  label="Ajouter la question"
                  isReady={true}
                  isLoading={false}
                />

                <div className="mt-8 p-4 border rounded-md border-gray-200">
                  <p className="font-bold text-sm">Import en lot</p>
                  <p className="text-xs text-gray-600 mt-2">
                    Format par ligne: Question ; Reponse correcte* ; Reponse 2 ; Reponse 3
                  </p>
                  <textarea
                    className="w-full mt-3 p-3 border rounded-md text-sm"
                    rows={7}
                    placeholder={"Exemple:\nQuelle est la capitale de la France ? ; Paris* ; Lyon ; Marseille"}
                    value={bulkQuestionsValue}
                    onChange={(event) => setBulkQuestionsValue(event.target.value)}
                  />
                  <label className="flex items-center gap-2 text-sm mt-3">
                    <input
                      type="checkbox"
                      checked={replaceExistingQuestions}
                      onChange={(event) => setReplaceExistingQuestions(event.target.checked)}
                    />
                    Remplacer les questions existantes
                  </label>
                  <div className="mt-4 flex flex-col gap-2">
                    <Button
                      onClick={() => handleBulkImportQuestions()}
                      type="button"
                      label="Importer en lot"
                      isReady={true}
                      isLoading={false}
                    />
                    <Button
                      onClick={() => handleDeleteAllQuestions()}
                      type="button"
                      label="Supprimer toutes les questions"
                      isReady={true}
                      isLoading={false}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section className="max-w-xl lg:w-3/5 lg:mt-0 mt-9 w-full overflow-auto h-[600px] p-4">
              <h1 className="mt-9 text-2xl font-bold">Quiz du niveau</h1>
              {quizList.length > 0 ? quizList.map((item, index) => (
                <div className="flex flex-col gap-4 mt-4" key={index}>
                  <Accordion>
                    <Accordion.Panel>
                      <Accordion.Title className="font-bold">
                        Question {index + 1} : {item.content}
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen(item);
                          }}
                          className="ml-4 text-blue-500 cursor-pointer inline-flex items-center"
                        >
                          editer
                          <FontAwesomeIcon
                            className="text-blue-500 text-lg ml-2"
                            icon={faPen}
                          />
                        </span>

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
                                <div className="flex flex-col gap-4">
                                  <Labelui label="Libelle de la question" />
                                  <InputField
                                    onClick={() => {
                                      return;
                                    }}
                                    onChange={handleChangeUpdateQuestionValue}
                                    value={updateQuestionValue}
                                    placeholder="libelle de la classe"
                                    type="text"
                                  />
                                  <div className="my-4">
                                    <Button
                                      onClick={() => handleUpdateQuestion()}
                                      label="Enregistrer"
                                      type="button"
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
                                    onClick={() => handleDeleteQuestion(item)}
                                    label="Supprimer la question"
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
                      </Accordion.Title>
                      <Accordion.Content>
                        <div>
                          {item.responses.map((el, ind) => (
                            <div className="flex justify-between" key={ind}>
                              <p
                                className={`${
                                  el.score > 0
                                    ? "text-green-500"
                                    : "text-gray-600"
                                } text-[15px] mb-6`}
                              >
                                Reponse {ind + 1} : {el.content} --- {el.score}{" "}
                                pts
                              </p>
                              <button onClick={() => handleDeleteAnswer(el.id)}>
                                <FontAwesomeIcon
                                  className="text-red-500 text-lg"
                                  icon={faTrash}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                        <div className="flex flex-col gap-4">
                          <p className="font-bold text-[15px] mt-6 text-gray-600">
                            Ajouter une reponse
                          </p>
                          <InputField
                            onClick={() => {
                              return;
                            }}
                            type="text"
                            placeholder="reponse..."
                            value={answersValue[index]}
                            onChange={(event) =>
                              handleChangeAnswersValue(event, index)
                            }
                          />
                          <InputField
                            onClick={() => {
                              return;
                            }}
                            type="number"
                            placeholder="score"
                            value={answerScoresValue[index]}
                            onChange={(event) =>
                              handleChangeAnswerScoreValue(event, index)
                            }
                          />
                          <Button
                            onClick={() => handleCreateAnswer(item.id, index)}
                            type="button"
                            label="Ajouter la reponse"
                            isReady={true}
                            isLoading={false}
                          />
                        </div>
                      </Accordion.Content>
                    </Accordion.Panel>
                  </Accordion>
                </div>
              )) : (<h3 className="mt-9 text-lg">Aucunes questions </h3>)}
            </section>
          </div>
        </div>
      ) : (
        <div className="h-screen w-full flex justify-center items-center">
          <HashLoader size={60} color="#F94C10" loading={!isLoading} />
        </div>
      )}
    </div>
  );
}
