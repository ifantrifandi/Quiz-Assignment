import {SET_QUIZ, SET_ALL_FINISHED_QUIZ, SET_ERROR, SET_FINISHED_QUIZ, SET_QUESTION_STATUS, SET_LOADING, SET_INDEX, SET_CURRENT_QUIZ} from './action/action-type'

const initialState = {
  quiz : [],
  finishedQuiz : [],
  allFinishedQuiz : [],
  questionStatus : [],
  currentQuiz : {},
  error : '',
  index : 0,
  loading : false
}

function reducer (state = initialState, action) {

  switch(action.type) {
    case SET_QUIZ :
        return {...state, quiz: action.payload}
    case SET_FINISHED_QUIZ : 
        return {...state, finishedQuiz: action.payload}
    case SET_ALL_FINISHED_QUIZ :
        return {...state, allFinishedQuiz: action.payload}
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
    default :
      return state
  }

}

export default reducer