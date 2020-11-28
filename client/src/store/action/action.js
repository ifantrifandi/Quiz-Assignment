import {SET_QUIZ, SET_ALL_FINISHED_QUIZ, SET_ERROR, SET_FINISHED_QUIZ, SET_QUESTION_STATUS, SET_LOADING, SET_CURRENT_QUIZ, SET_INDEX} from './action-type'
import QuizAPI from '../../API/QuizAPI'

export const setQuiz = (payload) => {
  return {type: SET_QUIZ, payload}
} 

export const setAllFinishedQuiz = (payload) => {
  return {type: SET_ALL_FINISHED_QUIZ, payload}
}

export const setFinishedQuiz = (payload) => {
  return {type: SET_FINISHED_QUIZ, payload}
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

export const fetchQuiz = () => {
  return (dispatch) => {
    QuizAPI({
      method: 'GET',
      url: '/quiz'
      // headers: localStorage.getItem('access_token')
    })
      .then(({data}) => {
        console.log(data)
        dispatch(setLoading(false))
        dispatch(setQuiz(data))
      })
      .catch(err => {
        console.log(err)
        // dispatch(setError(err.response.message))
      })
  }
}