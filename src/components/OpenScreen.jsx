function OpenScreen(props) {
  return (
    <main>
      <h1 className="start-title">Quizzical</h1>
      <p className="start-desc">Test your knowledge!</p>
      <button className="start-button" onClick={() => props.setStartQuiz(true)}>
        Start quiz
      </button>
    </main>
  );
}

export default OpenScreen;
