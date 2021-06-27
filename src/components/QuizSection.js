import React from "react";

const QuizSection = (props) => {
  const { quiz } = props;
  const options = (quiz &&quiz.options) && quiz.options.split(',');
  return(
    <div className="detail-section">
      <div className="question">{quiz.name}</div>
      {
        options && options.map((option, index) => {
          return (
            <div className="quiz-option" key={`${option}-${index}`}>
              <div className={`radio-button answer-value-${index + 1}`}>
                <input type="radio" id={option} name="fav_language" value={option} onClick={props.handleOptionClick.bind(this, option, quiz.id)}/>
                <label className="radio-label" for={option}>{option}</label>
              </div>
            </div>
          )
        })
      }

    </div>
  )
}


export default QuizSection;
