import React, { Suspense, lazy } from 'react';
import { Switch,  BrowserRouter, Route } from "react-router-dom";
import { QuizContext } from "./context/quizContext";
import './App.css';

const Quiz = lazy(
  () =>
    new Promise((resolve, reject) => {
      import('./views/Quiz')
        .then(result => resolve(result.default ? result : { default: result }))
        .catch(reject);
    })
);

const QuizDetail = lazy(
  () =>
    new Promise((resolve, reject) => {
      import('./components/QuizDetail')
        .then(result => resolve(result.default ? result : { default: result }))
        .catch(reject);
    })
);

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      quizData: [],
    }
  }

  updateQuizData = data => {
    // return new Promise(resolve => {
      // const newData = Object.assign({}, this.state.quizData, data);
      this.setState({ quizData: data });
    // });
  }

  render() {
    return (
      <QuizContext.Provider value={{ quizData: this.state.quizData, updateQuizData: this.updateQuizData}}>
        <BrowserRouter>
            <Switch>
              <Suspense fallback={<React.Fragment></React.Fragment>}>
                <Route exact path="/"  component={Quiz}/>
                <Route path="/quiz/:id?"  component={QuizDetail}/>
              </Suspense>
            </Switch>
        </BrowserRouter>
      </QuizContext.Provider>
    );

  }
}

export default App;
