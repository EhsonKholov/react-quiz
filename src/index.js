import React from 'react';
import ReactDOM from 'react-dom/client';
import Quiz from "./components/Quiz";
import "./index.css";
import {QuizProvider} from "./contexts/quiz";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Result from "./components/Result";
import Start from "./components/Start";
import PageNoteFound from "./components/PageNoteFound";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <QuizProvider>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Start />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/result" element={<Result />} />
                  <Route path="*" element={<PageNoteFound />} />
              </Routes>
          </BrowserRouter>
      </QuizProvider>
  </React.StrictMode>
);
