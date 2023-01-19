import { nanoid } from "nanoid";

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function parseData({ question, incorrect_answers, correct_answer }) {
  return {
    id: nanoid(),
    question,
    all_answers: shuffle([...incorrect_answers, correct_answer]),
    correct_answer,
    selected_answer: null,
  };
}
