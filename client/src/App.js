import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchQuiz, setCurrentQuiz, setRandomQuiz} from './store/action/action'
import Quiz from './pages/quiz'
import StatusPage from './pages/statusQuiz'
import {Spinner} from 'react-bootstrap'
import Login from './pages/login'
import Register from './pages/register'
import Leaderboard from './pages/leaderboard'
import NavbarComp from './component/Navbar'
import {Container, Row, Col} from 'react-bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App () {
  const dispatch = useDispatch()
  const [token, setToken] = useState('')
  const quiz = useSelector(state => state.quiz)
  const loading = useSelector(state => state.loading)
  const index = useSelector(state => state.index)
  const randomQuiz = useSelector(state => state.randomQuiz)

  useEffect(() => {
    let akses = localStorage.getItem('access_token')
    if(akses) {
      dispatch(fetchQuiz())
    }
  }, [])

  useEffect(() => { 
    let randomIndex = Math.floor(Math.random() * (randomQuiz.length - 1))
    dispatch(setCurrentQuiz(randomQuiz[randomIndex]))
    let filtered = randomQuiz.filter(el => el !== randomQuiz[randomIndex])
    if(filtered.length === 0) {
      dispatch(setRandomQuiz(quiz))
    } else {
      dispatch(setRandomQuiz(filtered))
    }
  }, [index, dispatch, quiz])
  
  useEffect(() => {
    setToken(localStorage.getItem('access_token'))
  }, [quiz, token])

  return(
    <>
    <Router>
      {
        loading && 
        <div className="bg-me width-100 height-100">
          <Spinner animation="border" className="margin-top-20 margin-left-50"/>
        </div>

      }
      {
        !loading &&
        <Container fluid className="bg-me width-100 height-100">
          <Row>
            {
              (quiz.length > 1) && <Col xs={12} sm={12} md={12} lg={12} xl={12} className="no-padding">
                <NavbarComp />
              </Col>
            }
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <Switch>
                <Route path='/' exact>
                  <Login/>
                </Route>
                <Route path='/register'>
                  <Register/>
                </Route>
                <Route path='/quiz'>
                  <Quiz/>
                </Route>
                <Route path='/status'>
                  <StatusPage/>
                </Route>
                <Route path='/leaderboard'>
                  <Leaderboard/>
                </Route>
              </Switch>
            </Col>
          </Row>
        </Container> 
      }
      </Router>
    </>
  )
}

export default  App