import {useContext, useEffect} from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";
import {useNavigate} from "react-router-dom";

const Quiz = () => {

  const [quizState, dispatch] = useContext(QuizContext);
  let navigate = useNavigate()
  //const apiURI = quizState.apiURL;

  useEffect(() => {
    if (quizState.questions.length > 0)
      return;

    if (!quizState.questions.length > 0)
      navigate("/")

    /*fetch(apiURI)
        .then(res => res.json())
        .then(data => {
          dispatch({type: "LOADED_QUESTIONS", payload: data.results})
        })*/
  });

  if (quizState.showResults) {
    navigate("/result")
  }

  return (
    <div className="quiz">
      {quizState.questions.length > 0 && (
          <div>
            <div className="score">
              Question {quizState.currentQuestionIndex + 1}/{quizState.questions.length}
            </div>
            <Question />
            <div
                className="next-button"
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
            >
              Next question
            </div>
          </div>
      )}
      {!quizState.questions.length > 0 && (
        <div><h1 style={{textAlign: "center"}}>Loading...</h1></div>
      )}
    </div>
  );
};

export default Quiz;
