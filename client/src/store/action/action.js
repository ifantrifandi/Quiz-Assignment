import {SET_QUIZ, SET_RANDOM_QUIZ, SET_ERROR, SET_QUESTION_STATUS, SET_LOADING, SET_CURRENT_QUIZ, SET_INDEX, SET_SCORE, SET_MESSAGE, SET_LEADERBOARD} from './action-type'
import QuizAPI from '../../API/QuizAPI'

export const setQuiz = (payload) => {
  return {type: SET_QUIZ, payload}
} 

export const setRandomQuiz = (payload) => {
  return {type: SET_RANDOM_QUIZ, payload}
}

export const setQuestionStatus = (payload) => {
  return {type: SET_QUESTION_STATUS , payload}
}

export const setError = (payload) => {
  return {type: SET_ERROR, payload}
}

export const setLoading = (payload) => {
  return {type: SET_LOADING, payload}
}

export const setCurrentQuiz = (payload) => {
  return {type: SET_CURRENT_QUIZ, payload}
}

export const setIndex = (payload) => {
  return {type: SET_INDEX, payload}
}

export const setMessage = (payload) => {
  return {type: SET_MESSAGE, payload}
}
export const setScore = (payload) => {
  return {type: SET_SCORE, payload}
}

export const setLeaderboard = (payload) => {
  return {type: SET_LEADERBOARD, payload}
}

export const fetchQuiz = () => {
  return (dispatch) => {
    QuizAPI({
      method: 'GET',
      url: '/quiz',
      headers: {
        access_token: localStorage.getItem('access_token') 
      }
    })
      .then(({data}) => {
        dispatch(setLoading(false))
        dispatch(setRandomQuiz(data))
        dispatch(setQuiz(data))
      })
      .catch(err => {
        dispatch(setError(err.response.data.message))
      })
  }
}

export const newHighScore = (highscore) => {

  return (dispatch) => {
    let id = localStorage.getItem('user_id')
    QuizAPI({
      method: 'PATCH',
      url: `/highscore/${id}`,
      data: {
        highest_score : highscore
      },
      headers: {
        access_token: localStorage.getItem('access_token') 
      }
    })
      .then(({data}) => {
        console.log(data)
        dispatch(setMessage(data.message))
      })
      .catch(err => {
        console.log(err.response)
        dispatch(setError(err.response.data.message))
      })
  }
}

export const fetchLeaderboard = () => {
  return (dispatch) => {
    QuizAPI({
      method: 'GET',
      url: '/leaderboard',
      headers: {
        access_token: localStorage.getItem('access_token') 
      }
    })
      .then(({data}) => {
        console.log(data)
        dispatch(setLeaderboard(data))
      })
      .catch(err => {
        console.log(err)

      })
  }
}

export const login = (payload) => {
  return (dispatch) => {
    QuizAPI({
      method: 'POST',
      url: '/login',
      data: {
        username: payload.username,
        password: payload.password
      }
    })
      .then(({data}) => {
        localStorage.setItem('user_id', data.id)
        localStorage.setItem('username', data.username)
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('highest_score', data.highest_score)
        dispatch(setMessage('Berhasil Login!'))
      })
      .catch(err => {
        dispatch(setError(err.response.data.message))
      })
  }
}

export const register = (payload) => {
  return (dispatch) => {
    QuizAPI({
      method: 'POST',
      url: '/register',
      data: {
        username: payload.username,
        password: payload.password
      }
    })
      .then(({data}) => {
        dispatch(setMessage(data.message))
      })
      .catch(err => {
        dispatch(setError(err.response.data.message))
      })
  }
}