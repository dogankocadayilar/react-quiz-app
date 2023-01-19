import { decode } from "html-entities";

function Question({
  id,
  question,
  all_answers,
  correct_answer,
  selected_answer,
  updateSelectedAnswer,
  showResult,
}) {
  return (
    <div className="question-container">
      <h2 className="question-title">{decode(question)}</h2>
      <div className="button-container">
        {all_answers.map((answer, index) => (
          <button
            className={`answer-button ${
              answer === selected_answer ? "selected" : ""
            }
            ${
              showResult && answer === correct_answer
                ? "correct"
                : showResult && answer !== correct_answer
                ? "result"
                : ""
            }
            ${
              showResult &&
              answer === selected_answer &&
              answer !== correct_answer
                ? "incorrect"
                : ""
            }
            `}
            disabled={showResult}
            onClick={() => updateSelectedAnswer(id, answer)}
            key={index}
          >
            {decode(answer)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
