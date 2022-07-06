import {useContext} from "react";
import {QuizContext} from "../contexts/quiz";
import {useNavigate} from "react-router-dom";

const Result = () => {

    const [quizState, dispatch] = useContext(QuizContext);
    const navigate = useNavigate();
    
    return (
        <div className="quiz">
            <div className="results">
                <div className="congratulations">Congratulations</div>
                <div className="results-info">
                    <div>You have completed the quiz.</div>
                    <div>
                        You've got {quizState.correctAnswersCount} of{" "} {quizState.questions.length}
                    </div>
                </div>
                <div style={{display: "flex"}}>
                    {/*<div
                        className="next-button"
                        style={{display: "inline-block"}}
                        onClick={() => {
                            dispatch({ type: "RESTART" });
                            navigate("/quiz");
                        }}
                    >
                        Restart
                    </div>*/}
                    <div
                        className="next-button"
                        style={{display: "inline-block"}}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Home
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Result;