import React from 'react'
import {Nav, Navbar, Button, Col} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {setQuiz, setIndex, setQuestionStatus} from '../store/action/action'
function NavbarComp() {
  const history = useHistory()
  const dispatch = useDispatch()
  
  function logout() {
    dispatch(setQuiz([]))
    dispatch(setIndex(0))
    dispatch(setQuestionStatus([]))
    localStorage.clear()
    history.push('/')
  }
  return(
    <Col xs={12} sm={12} md={12} lg={12} xl={12} className="no-padding">
      <Navbar bg="light" variant="light">
        <Navbar.Brand>Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/quiz">Quiz</Nav.Link>
          <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
        </Nav>
        <Nav>
          <Button className="mr-2" variant="dark" onClick={logout} >Logout</Button>
        </Nav>
      </Navbar>
    </Col>
  )
}

export default NavbarComp