import {useContext, useEffect, useState} from "react";
import {QuizContext} from "../contexts/quiz";
import {useNavigate} from "react-router-dom";

const Start = () => {

    const [quizState, dispatch] = useContext(QuizContext);
    const navigate = useNavigate();

    const [data, setData] = useState({
        amount: 10,
        category: '',
        difficulty: '',
        type: ''
    });

    //const [loading, setLoading] = useState(false)

    const apiURLCategory = "https://opentdb.com/api_category.php";

    useEffect(() => {
        if (quizState.categories.length > 0)
            return

        fetch(apiURLCategory)
            .then(res => res.json())
            .then(data => {
                dispatch({type: "LOADED_CATEGORIES", payload: data.trivia_categories})
            })
    });


    const submit = (event) => {
        let p = (data.amount === 0 ? 'amount=10' : 'amount=' + Number.parseInt(Math.abs(data.amount))) +
            (data.category === 'any' || data.category === '' || data.category === null || data.category === undefined ? '' : '&category=' + data.category) +
            (data.difficulty === 'any' || data.difficulty === '' || data.difficulty === null || data.difficulty === undefined ? '' : '&difficulty=' + data.difficulty) +
            (data.type === 'any' || data.type === '' || data.type === null || data.type === undefined ? '' : '&type=' + data.type) +
            '&encode=url3986'

        //https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple
        fetch(quizState.apiURL + p)
            .then(res => res.json())
            .then(data => {
                dispatch({type: "FORM_START_PAGE_SUBMIT", payload: data.results});
                navigate("/quiz");
            })

        event.preventDefault();
    }

    const inputsHandler = (e) => {
        const {name, value} = e.target
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <div className="quiz">
            <div className="start">
                <div className="congratulations">Tests</div>
                <div className="results-info">
                    <div>
                        <h2>Welcome</h2>
                    </div>
                </div>

                <form onSubmit={submit}>
                    <div className="block">
                        <div style={{marginBottom: "1rem"}}>
                            <label className="form-label">Number of questions:</label>
                            <input type="number" className="form-control" name="amount" value={data.amount} onChange={inputsHandler}/>
                        </div>
                        <div style={{marginBottom: "1rem"}}>
                            <label className="form-label">Select a category:</label>
                            <select id="category" name="category" className="form-select" value={data.category} onChange={inputsHandler}>
                                <option key="any" value="any">Any Category</option>
                                {quizState.categories.map((category, index) => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{marginBottom: "1rem"}}>
                            <label className="form-label">Select Difficulty:</label>
                            <select id="difficulty" name="difficulty" className="form-select" value={data.difficulty} onChange={inputsHandler}>
                                <option key="any" value="any">Any Difficulty</option>
                                <option key="easy" value="easy">Easy</option>
                                <option key="medium" value="medium">Medium</option>
                                <option key="hard" value="hard">Hard</option>
                            </select>
                        </div>
                        <div style={{marginBottom: "1rem"}}>
                            <label className="form-label">Select Type:</label>
                            <select id="type" name="type" className="form-select" value={data.type} onChange={inputsHandler}>
                                <option key="any" value="any">Any Type</option>
                                <option key="multiple" value="multiple">Multiple Choice</option>
                                <option key="boolean" value="boolean">True/False</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="next-button">
                        Start
                    </button>

                </form>
            </div>
        </div>
    );
}

export default Start;