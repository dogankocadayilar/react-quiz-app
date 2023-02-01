import { useState } from "react";
import useFetch from "../hooks/useFetch";
import Question from "./Question";

function Quiz() {
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [numOfCorrectAnswers, setNumOfCorrectAnswers] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isPlayAgainPressed, setIsPlayAgainPressed] = useState(false);
  const [data, setData, loading] = useFetch(isPlayAgainPressed);

  function updateSelectedAnswer(id, answer) {
    setData((prevState) => {
      return prevState.map((quiz) => {
        return quiz.id === id ? { ...quiz, selected_answer: answer } : quiz;
      });
    });
  }

  function checkAnswers() {
    const notAllAnswered = data.some((quiz) => quiz.selected_answer === null);
    setShowWarningMessage(notAllAnswered);

    if (!notAllAnswered) {
      setNumOfCorrectAnswers(
        data.filter((quiz) => quiz.selected_answer === quiz.correct_answer)
          .length
      );
      setShowResult(true);
    }
  }

  function playAgain() {
    setShowResult(false);
    setNumOfCorrectAnswers(0);
    setData([]);
    setIsPlayAgainPressed((prevState) => !prevState);
  }

  return (
    <main>
      {loading && <h1>Loading...</h1>}
      {!loading &&
        data.map((quiz) => (
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
      {!loading && data.length > 0 && !showResult && (
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
