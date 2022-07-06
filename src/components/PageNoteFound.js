import {useNavigate} from "react-router-dom";


const PageNoteFound = () => {

    const navigate = useNavigate();

    return (
        <div className="quiz">
            <div className="results">
                <div className="congratulations">Page Not Found</div>
                <div className="results-info">
                    <h1>404</h1>
                </div>
                <div className="next-button" onClick={() => navigate("/")}>
                    Home
                </div>
            </div>
        </div>
    );
}

export default PageNoteFound;