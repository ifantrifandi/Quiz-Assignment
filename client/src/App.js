import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchQuiz, setLoading, setCurrentQuiz} from './store/action/action'
import Quiz from './component/quiz'
function App () {
  const dispatch = useDispatch()
  const quiz = useSelector(state => state.quiz)
  const index = useSelector(state => state.index)
  const loading = useSelector(state => state.loading)

  useEffect(() => {
    dispatch(setLoading(true))
    dispatch(fetchQuiz())
  }, [dispatch])

  useEffect(() => {
    dispatch(setCurrentQuiz(quiz[index]))
  }, [index, dispatch, quiz])
  
  return(
    <>
    {
      loading && 
      <div>
        Lagi Loading Nih
      </div>

    }
    {
      !loading && 
      <div>
        <Quiz/>
      </div>

    }
    </>
  )
}

export default  App