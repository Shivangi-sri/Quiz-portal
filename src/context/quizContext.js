import React from "react";

const quizData = [];

export const QuizContext = React.createContext({quizData, updateQuizData: () => {}});

export function withQuiz(Child) {
  return function QuizComponent(props) {
    return (
      <QuizContext.Consumer>
        {({quizData, updateQuizData}) => (<Child {...props} quizData={quizData} updateQuizData={updateQuizData}/>)}
      </QuizContext.Consumer>
    )
  }
}
