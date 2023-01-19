import { useEffect, useState } from "react";
import "./App.css";
import OpenScreen from "./components/OpenScreen";
import Quiz from "./components/Quiz";
function App() {
  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <>
      {!startQuiz && <OpenScreen setStartQuiz={setStartQuiz} />}
      {startQuiz && <Quiz />}
    </>
  );
}

export default App;
