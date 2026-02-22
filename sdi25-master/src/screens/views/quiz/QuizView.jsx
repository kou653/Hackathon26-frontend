import {
  handleServiceGetQuiz,
  handleServiceSendQuizScore,
} from "../../../services/quizService.tsx";
import Button from "../../../components/ui/ButtonUi.tsx";
import { useEffect, useState, useRef } from "react";
import AnswerTimer from "./timer/AnswerTimer.jsx";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./quiz.css";

import ReactAudioPlayer from "react-audio-player";
import audio from "../../../assets/song/song.mp3";

const Quiz = () => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [counter, setCounter] = useState(0);
  const [duration] = useState(16);
  const intervalRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    get();
  }, []);

  async function get() {
    setIsLoading(true);
    const result = await getQuizList();
    if (result.length === 0) {
      navigate("/hackathon/administration/EndQuiz");
    }
    const list = {
      topic: "Javascript",
      level: "Beginner",
      totalQuestions: 4,
      perQuestionScore: 5,
      questions: result,
    };
    setQuiz(list);
    setIsLoading(false);
  }

  const [quiz, setQuiz] = useState({
    topic: "Javascript",
    level: "Beginner",
    totalQuestions: 4,
    perQuestionScore: 5,
    questions: [],
  });

  async function getQuizList() {
    const result = await handleServiceGetQuiz();
    return result;
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCounter((cur) => cur + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    if (counter === duration + 1) {
      setCounter(0);
      onClickNext(quiz.questions.length);
    }
  }, [counter]);

  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion] || {};

  const onClickNext = async () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      clearInterval(intervalRef.current);
    }

    setCounter(0);
    setIsReset(true);
    setTimeout(() => {
      setIsReset(false);
    }, 1000);
  };

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  async function handleSendScore(score) {
    const data = {
      score: score,
    };
    await handleServiceSendQuizScore(data);
    navigate("/hackathon/administration/EndQuiz");
  }

  const [isReset, setIsReset] = useState(false);

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div className="quiz--wrapper background-p">
      <ReactAudioPlayer src={audio} autoPlay />
      {!isLoading ? (
        <div className="quiz-container ">
          {!showResult ? (
            <div>
              <AnswerTimer duration={duration} reset={isReset} />
              <div>
                <span className="active-question-no">
                  {addLeadingZero(activeQuestion + 1)}
                </span>
                <span className="total-question">
                  /{addLeadingZero(quiz.questions.length)}
                </span>
              </div>
              <h2>{question}</h2>
              <ul className="ml-9">
                {choices.map((answer, index) => (
                  <li
                    onClick={() => onAnswerSelected(answer, index)}
                    key={answer}
                    className={
                      selectedAnswerIndex === index ? "selected-answer" : null
                    }
                  >
                    {answer}
                  </li>
                ))}
              </ul>
              <div className="flex-right">
                <button
                  onClick={onClickNext}
                  disabled={selectedAnswerIndex === null}
                >
                  {activeQuestion === questions.length - 1
                    ? "Terminer"
                    : "Suivant"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <p className="font-bold text-xl text-center">
                Soumettez vos réponses
              </p>
              <img
                className="h-[250px] mx-auto"
                src="https://img.freepik.com/free-vector/finish-line-concept-illustration_114360-2178.jpg?w=1060&t=st=1708141352~exp=1708141952~hmac=d116635289e4be2574ae2dbf06604d508f37cd76d43ae49efedc5a60f65cb035"
                alt=""
              />
              <Button
                isReady={true}
                isDisable={false}
                label="continuer"
                onClick={() => handleSendScore(result.score)}
              />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Quiz;
