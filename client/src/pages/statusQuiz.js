import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setScore, setQuestionStatus, setMessage, setRandomQuiz} from '../store/action/action'
import {Container, Row, Col, Table, Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
function StatusPage(){

  const dispatch = useDispatch()
  const history = useHistory()
  const [correctAnswer, setCorrectAnswer] = useState([])
  const [wrongAnswer, setWrongAnswer] = useState([])
  const quiz = useSelector(state => state.quiz)
  const score = useSelector(state => state.score)
  const questionStatus = useSelector(state => state.questionStatus)
  const message = useSelector(state => state.message)
  const randomQuiz = useSelector(state => state.randomQuiz)

  useEffect(() => {
    setCorrectAnswer(questionStatus.filter(el => el[1] === true))
    setWrongAnswer(questionStatus.filter(el => el[1] === false))
  }, [questionStatus])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setMessage(''))
    }, 3000)
  }, [message])

  function tryAgain(e){
    e.preventDefault()
    dispatch(setScore(0))
    dispatch(setQuestionStatus([]))
    dispatch(setMessage(''))
    if(randomQuiz.length < 1) {
      dispatch(setRandomQuiz(quiz))
    }
    history.push('/quiz')
  }

  return(
    <div>
      <h1 className="center">
        Quiz Selesai!!!
      </h1>
      <h3 className="center">Skor Kamu : {score}</h3>
      {message && <Alert  variant="success">
        {message}
      </Alert>}
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <h3 className="center">Correct Answer</h3>
            <Table>
              <tbody>
                
                  {
                    correctAnswer && correctAnswer.map(correct => (
                      <tr>
                        <td>{correct[0]}</td>
                      </tr>
                    ))
                  }
              </tbody>
            </Table>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <h3 className="center">Wrong Answer</h3>
            <Table>
              <tbody>
                  {
                    wrongAnswer && wrongAnswer.map(wrong => (
                      <tr>
                        <td>{wrong[0]}</td>
                      </tr>
                    ))
                  }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <div className="width-100">
        <button onClick={tryAgain} className="block margin-center">Try Again</button> 
      </div>
    </div>
  )
}

export default StatusPage