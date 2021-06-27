import React from "react";
import { withRouter } from 'react-router-dom';

const QuizList = (props) => {
  const { quiz } = props;

  const startQuiz = (id) => {
    props.history.push(`/quiz/${id}`);
  }

  return(
    <div className="quiz-container">
      <div className="header-section">
        <h3 className={`quiz-list-${quiz.id}`}>{quiz.name}</h3>
        <button className={`button start-quiz-${quiz.id}`} onClick={() => startQuiz(quiz.id)}>Start</button>
      </div>
      <p className="quiz-description">{quiz.description}</p>
    </div>
  )
}


export default withRouter(QuizList);
