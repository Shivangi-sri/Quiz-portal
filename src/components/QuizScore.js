import React from "react";
import { withQuiz } from "../context/quizContext";

const QuizScore = (props) => {
  const { result, questions } = props;

   const getQuestionTitle = (quesId) => {
    const questionData = questions.filter(quiz => quiz.id === quesId);
    return questionData[0].name;
  }

  return(
    <div className="score-section">
      <h2 className="score">Your score is: {result.score}</h2>
      <section>
        <div className="answer-label"> Answers </div>
        {result.questions.length > 0 &&
          result.questions.map((question, index) => {
            const title = getQuestionTitle(question.ques_id);
            return (
              <div className="result-section" >
                <div className={`question-title question-${index + 1}`}>
                  Question: {title}
                </div>
                <div className={`submitted submitted-answer-${index + 1}`}>
                  Your Answer: {question.submitted_option}
                </div>
                <div className={`correct correct-answer-${index + 1}`}>
                  Correct Answer: {question.correct_option}
                </div>
              </div>
              // <

            )
          })
        }
      </section>
    </div>
  )
}


export default withQuiz(QuizScore);
