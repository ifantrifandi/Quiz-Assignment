import {SET_QUIZ, SET_RANDOM_QUIZ, SET_ERROR, SET_QUESTION_STATUS, SET_LOADING, SET_INDEX, SET_CURRENT_QUIZ, SET_SCORE, SET_MESSAGE, SET_LEADERBOARD} from './action/action-type'

const initialState = {
  quiz : [],
  randomQuiz : [],
  questionStatus : [],
  currentQuiz : {},
  error : '',
  index : 0,
  score : 0,
  loading : false,
  message: '',
  leaderboard: []
}

function reducer (state = initialState, action) {

  switch(action.type) {
    case SET_QUIZ :
        return {...state, quiz: action.payload}
    case SET_RANDOM_QUIZ :
        return {...state, randomQuiz: action.payload}
    case SET_QUESTION_STATUS :
        return {...state, questionStatus: action.payload}
    case SET_ERROR :
        return {...state, error: action.payload}
    case SET_LOADING :
        return {...state, loading: action.payload}
    case SET_CURRENT_QUIZ :
        return {...state, currentQuiz: action.payload}
    case SET_INDEX:
        return {...state, index: action.payload}
    case SET_SCORE:
        return {...state, score: action.payload}
    case SET_MESSAGE:
        return {...state, message: action.payload}
    case SET_LEADERBOARD:
        return {...state, leaderboard: action.payload}        
    default :
      return state
  }

}

export default reducer