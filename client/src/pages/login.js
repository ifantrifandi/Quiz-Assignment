import React, {useState, useEffect} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {login, setMessage, setError, fetchQuiz, setLoading} from '../store/action/action'
import {useDispatch, useSelector} from 'react-redux'
function Login(){
  const history = useHistory()
  const dispatch = useDispatch()
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  })
  const message = useSelector(state => state.message)
  const error = useSelector(state => state.error)

  useEffect(() => {
    dispatch(setError(''))
    dispatch(setMessage(''))
  }, [])

  function onChangeText (e) {
    if(e.target.name === 'username') {
      setLoginForm({...loginForm, username: e.target.value})
    }

    if(e.target.name === 'password') {
      setLoginForm({...loginForm, password: e.target.value})
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if(token) {
      history.push('/quiz')
        dispatch(setLoading(true))
        dispatch(fetchQuiz())
    }
    let settingMessage = setTimeout(() =>{
      dispatch(setMessage(''))
      dispatch(setError(''))
    }, 2000)

    return () => {
      clearTimeout(settingMessage)
    }
  }, [message, error, history])

  function Register(e) {
    e.preventDefault()
    history.push('/register')
  }

  function LoginIn(e){
    e.preventDefault()
    dispatch(login(loginForm))
  }

  return (
    <div>
      <div>
        <h1>Quiz Login</h1>
        <div className="login-box">
          <Form>
              <Form.Group>
                  <Form.Control
                   type="username"
                   name="username"
                   placeholder="Enter your username"
                   onChange={onChangeText}
                   />
              </Form.Group>
              <Form.Group>
                  <Form.Control
                   type="password"
                   name="password"
                   placeholder="Enter your password"
                   onChange={onChangeText}
                   />
              </Form.Group>
              {
                message &&
                <Alert variant="success">
                  {message}
                </Alert>
              }
              {
                error &&
                <Alert variant="danger">
                  {error}
                </Alert>
              }
              <Button variant="secondary" onClick={LoginIn}>
                Login
              </Button>
              <Button variant="secondary" style={{marginLeft: '20px'}} onClick={Register}>
                Register
              </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login