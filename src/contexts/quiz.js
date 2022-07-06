import { createContext, useReducer } from "react";
import {normalizeQuestions, shuffleAnswers} from "../helpers";

const initialState = {
  currentQuestionIndex: 0,
  questions: [],
  showResults: false,
  answers: [],
  currentAnswer: "",
  correctAnswersCount: 0,
  categories: [],
  apiURL: "https://opentdb.com/api.php?",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SELECT_ANSWER": {

      const correctAnswersCount = action.payload === state.questions[state.currentQuestionIndex].correctAnswer ? state.correctAnswersCount + 1 : state.correctAnswersCount;

      return {
        ...state,
        currentAnswer: action.payload,
        correctAnswersCount,
      };
    }

    case "NEXT_QUESTION": {

      const showResults = state.currentQuestionIndex === state.questions.length - 1;
      const currentQuestionIndex = showResults ? state.currentQuestionIndex : state.currentQuestionIndex + 1;
      const answers = showResults ? [] : shuffleAnswers(state.questions[currentQuestionIndex]);

      return {
        ...state,
        currentQuestionIndex,
        showResults,
        answers,
        currentAnswer: "",
      };
    }

    case "RESTART": {
      return initialState;
    }

    case "FORM_START_PAGE_SUBMIT": {
      const normalizedQuestions = normalizeQuestions(action.payload)

      return {
        ...initialState,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0])
      };
    }

    case "LOADED_QUESTIONS": {
      const normalizedQuestions = normalizeQuestions(action.payload)

      return {
        ...state,
        questions: normalizedQuestions,
        answers: shuffleAnswers(normalizedQuestions[0])
      };
    }

    case "LOADED_CATEGORIES": {
      return {
        ...state,
        categories: action.payload
      }
    }

    default: {
      return state;
    }
  }
};

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
};
