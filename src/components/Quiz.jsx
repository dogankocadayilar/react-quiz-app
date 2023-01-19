import { useEffect, useState } from "react";
import { parseData } from "../helpers/helpers";
import Question from "./Question";

function Quiz() {
  const [quizzes, setQuizzes] = useState([]);
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isPlayAgainPressed, setIsPlayAgainPressed] = useState(false);

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((resp) => resp.json())
      .then((data) =>
        setQuizzes(() => {
          return data.results.map((result) => {
            return parseData(result);
          });
        })
      );
  }, [isPlayAgainPressed]);

  function updateSelectedAnswer(id, answer) {
    setQuizzes((prevState) => {
      return prevState.map((quiz) => {
        return quiz.id === id ? { ...quiz, selected_answer: answer } : quiz;
      });
    });
  }

  function checkAnswers() {
    const notAllAnswered = quizzes.some(
      (quiz) => quiz.selected_answer === null
    );
    setShowWarningMessage(notAllAnswered);

    if (!notAllAnswered) {
      setNumOfCorrectAnswers(
        quizzes.filter((quiz) => quiz.selected_answer === quiz.correct_answer)
          .length
      );
      setShowResult(true);
    }
  }

  function playAgain() {
    setShowResult(false);
    setNumOfCorrectAnswers(0);
    setQuizzes([]);
    setIsPlayAgainPressed((prevState) => !prevState);
  }

  return (
    <main>
      {quizzes.map((quiz) => (
        <Question
          key={quiz.id}
          {...quiz}
          updateSelectedAnswer={updateSelectedAnswer}
          showResult={showResult}
        />
      ))}
      {showWarningMessage && (
        <p className="warning-message">There are unanswered questions!</p>
      )}
      {quizzes.length > 0 && !showResult && (
        <div className="center">
          <button className="check-answers-button" onClick={checkAnswers}>
            Check Answers
          </button>
        </div>
      )}
      {showResult && (
        <div className="result-container">
          <p className="result-message">
            You scored {numOfCorrectAnswers}/5 correct answers.
          </p>
          <button className="check-answers-button" onClick={playAgain}>
            Play again
          </button>
        </div>
      )}
    </main>
  );
}

export default Quiz;
