import React, {useState, useEffect} from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'
import {register, setMessage, setError} from '../store/action/action'
import {useDispatch, useSelector} from 'react-redux'
function Register(){

  const history = useHistory()
  const dispatch = useDispatch()
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: ''
  })
  const [errorType, setErrorType] = useState([])
  const error = useSelector(state => state.error)
  const message = useSelector(state => state.message)

  useEffect(() => {
    dispatch(setError(''))
    dispatch(setMessage(''))
  }, [])

  useEffect(() => {
    console.log(error)
    if(error && error !== 'Username / Password salah') {
      setErrorType(error.toLowerCase().split('%'))
    }

    let settingMessage = setTimeout(() =>{
      dispatch(setMessage(''))
      dispatch(setError(''))
      setErrorType([])
    }, 2000)

    return () => {
      clearTimeout(settingMessage)
    }

  }, [error, dispatch])

  useEffect(() => {
    if(message) {
      history.push('/')
    }
  }, [message])
  function onChangeText (e) {
    if(e.target.name === 'username') {
      setRegisterForm({...registerForm, username: e.target.value})
    }

    if(e.target.name === 'password') {
      setRegisterForm({...registerForm, password: e.target.value})
    }
  }

  function RegisterSubmit(e) {
    e.preventDefault()
    dispatch(register(registerForm))
  }

  function backToLogin() {
    history.push('/')
  }

  return (
    <div>
      <div>
        <h1>Quiz Register</h1>
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
              {
                errorType && (errorType.find(el => el.includes('username'))) &&
                <Alert variant="danger">
                  {errorType.find(el => el.includes('username'))}
                </Alert>
              }
              <Form.Group>
                  <Form.Control
                   type="password"
                   name="password"
                   placeholder="Enter your password"
                   onChange={onChangeText}
                   />
              </Form.Group>
              {
                errorType && (errorType.find(el => el.includes('password'))) &&
                <Alert variant="danger">
                  {errorType.find(el => el.includes('password'))}
                </Alert>
              }
              <Button variant="secondary" onClick={RegisterSubmit}>
                Register
              </Button>
              <Button variant="secondary" style={{marginLeft: '20px'}} onClick={backToLogin}>
                Back To Login
              </Button>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register