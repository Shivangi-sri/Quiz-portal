import React from "react";
import { withQuiz } from "../context/quizContext";
import QuizList from "../components/QuizList";
import constants from "../constants";

class Quiz extends React.Component {

  componentDidMount() {
    this.fetchQuizList();
  }

  fetchQuizList = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/quiz/all`, {
      headers: {
        'auth-token': constants.AUTH_TOKEN
      },
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(async response => {
      await this.props.updateQuizData(response);
    });
  }


  render() {
    const { quizData } = this.props;

    return(
      <div className="main-container">
        <h1 className="heading">Welcome to CodeJudge</h1>
        <div className="quiz-list">
          {quizData.length > 0 &&
            quizData.map(quiz => {
              return (<QuizList quiz={quiz} />)
            })
          }
        </div>
      </div>
    )
  }
}


export default withQuiz(Quiz);
