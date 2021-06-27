import React from "react";
import constants from "../constants";
import QuizSection from "./QuizSection";
import QuizScore from "./QuizScore";

class QuizDetail extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quizQuestions: {},
      quizSubmission: [],
      seconds: 15,
      question: 0,
      isQuizFinished: false,
      result: {},
    }
  }

  fetchQuizDetail = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/quiz-questions/all/${id}`, {
      headers: {
        'auth-token': constants.AUTH_TOKEN
      },
      method: 'GET',
    })
    .then(resp => resp.json())
    .then(response => {
      this.setState({quizQuestions: response })
    });
  }

  async componentDidMount() {
    const quizId  = this.props.match.params.id;

    if(quizId) {
      await this.fetchQuizDetail(quizId)
      this.handleProgressbar();
      this.setTimer();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { seconds, question, quizSubmission, quizQuestions, isQuizFinished } = this.state;

    if(nextState.seconds !== seconds && !isQuizFinished) {
      this.setTimer();
    }

    if(seconds === 0) {
      if(quizSubmission.length !== quizQuestions.questions.length) {
        this.handleOptionClick()
      }
      else {
        this.setState({question: 0, seconds: 15})
      }
    }

    return true;
  }

  setTimer = () => {
    const { seconds } = this.state;
    if(seconds > 0) {
      setTimeout(() => {
        this.setState(prevState => {
          return { seconds: prevState.seconds  - 1 }
        })
      }, 1000);
    }
  }

  percentage = (partialValue, totalValue) => {
    return (100 * partialValue) / totalValue;
  }

  handleProgressbar = () => {
    const { quizQuestions, quizSubmission } = this.state;

    if(quizQuestions.questions) {
      const percen = this.percentage(Object.keys(quizSubmission).length, quizQuestions.questions.length);
      this.setState({progress:  percen.toFixed(1) + '%' })
      const ele = document.getElementById('myBar')
      ele.style.width = percen.toFixed(1) + '%';
    }
  }

  handleOptionClick = (selectedOption = null, questionId = null) => {

    const result = {ques_id: questionId, submitted_option: selectedOption || ''};
    const { quizQuestions } = this.state;

    let quizSubmission = [...this.state.quizSubmission];

    if(selectedOption) {
      quizSubmission.push(result);
    }

    if(quizSubmission.length !== quizQuestions.questions.length) {
      this.setState(prevState => ({question: prevState.question + 1, quizSubmission: quizSubmission, seconds: 15}));
      this.handleProgressbar();
    }
    else {
      this.setState({isQuizFinished: true, quizSubmission: quizSubmission}, () => {
        console.log('INNNN');
        this.fetchResult();
      });
    }
  }

  fetchResult = () => {
    const { quizSubmission } = this.state;
    const quizId  = this.props.match.params.id;
    const payload = {
      quiz_id: parseInt(quizId),
      mappings: quizSubmission
    }

    fetch(`${process.env.REACT_APP_API_URL}/api/user/quiz-score`, {
      headers: {
        'auth-token': constants.AUTH_TOKEN,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
    .then(resp => resp.json())
    .then(response => {
      this.setState({result: response })
    });
  }

  render() {
    const { quizQuestions, seconds, question, isQuizFinished, result } = this.state;
    return(
      <>
        {isQuizFinished && Object.keys(result).length > 0 ?
          <QuizScore result={result} questions={quizQuestions.questions}/>
        :
        <>
          <div className="detail-container">
            <h1 className="quiz-heading">{quizQuestions.name}</h1>
            {!isQuizFinished &&
              <>
              <div className="progress-section">
                <div id="myProgress">
                  <div id="myBar"></div>
                </div>
              </div>
              <div className="timer time-bar" >Time Remaining: {`0.${seconds}/0.15 seconds`}</div>
            </>
          }
          </div>
          <div className="quiz-section">
            {quizQuestions.questions && quizQuestions.questions[question] && quizQuestions.questions.length > 0 &&
              <QuizSection quiz={quizQuestions.questions[question]} handleOptionClick={this.handleOptionClick}/>
            }
          </div>
        </>
        }
      </>
    )
  }
}


export default QuizDetail;
