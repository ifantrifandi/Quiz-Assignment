import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setIndex} from '../store/action/action'
function Quiz () {

  const dispatch = useDispatch()
  const currentQuiz = useSelector(state => state.currentQuiz)
  const [answerChoice, setAnswerChoice] = useState([])
  const index = useSelector(state => state.index)
  const [answered, setAnswered] = useState('');
  const [checkBoxAnswer, setCheckBoxAnswer] = useState([])
  const [loopImage, setLoopImage] = useState([])

  useEffect(() => {
    
    setAnswered('')
    setCheckBoxAnswer([])

    for(let i = 0 ; i < document.getElementsByClassName('checkbox').length; i++ ) {
      document.getElementsByClassName('checkbox')[i].checked = false
    }

    if(currentQuiz && !currentQuiz.image_loop) {
      setLoopImage([])
    }
    if(currentQuiz && currentQuiz.answer) {
      let choiceTemp = currentQuiz.answer.split('%')
      setAnswerChoice(choiceTemp)
    }
    if(currentQuiz && currentQuiz.image_loop) {
      let number = currentQuiz.image_loop
      let newArray = Array(number).fill('')
      setLoopImage(newArray)
    }

  }, [currentQuiz])

  function onChange(e) {

    if(e.target.type === 'checkbox') {
      if(e.target.checked === true) { 
        setCheckBoxAnswer([...checkBoxAnswer, e.target.value])
      } else {
        let newCheckBoxAnswer = checkBoxAnswer.filter(el => el != e.target.value)
        setCheckBoxAnswer(newCheckBoxAnswer)
      }
    } else {
      setAnswered(e.target.value)
    }

  }

  function submit(e) {
    e.preventDefault()
    dispatch(setIndex(index + 1))
  }

  return(
    <>
      {
        currentQuiz && <div>
          <p>
            {currentQuiz.question}
          </p>
          <div>
            {
              currentQuiz.image_question && !currentQuiz.image_loop &&
              <img src={currentQuiz.image_question}/>
            }
          </div>
          <div>
          {
            (loopImage.length > 1) && loopImage.map(el => {
              return <img src={currentQuiz.image_question}/>
            })
          }
          </div>
          <form onSubmit={submit}>
            {
              currentQuiz.answer && (answerChoice.length > 1) && (currentQuiz.type === 'radio') &&
              answerChoice.map((ans, idx) => (
                <div key={idx}>
                  <input type={currentQuiz.type} name='answer' value={ans} onChange={onChange} /> 
                  <label>{ans}</label> 
                </div>
              ))
            }
            {
              currentQuiz.answer && (answerChoice.length > 1) && (currentQuiz.type === 'checkbox') &&
              answerChoice.map((ans, idx) => (
                <div key={idx}>
                  <input type={currentQuiz.type} name='answer' value={ans} onChange={onChange} className="checkbox"/> 
                  <label>{ans}</label> 
                </div>
              ))
            }
            {
              currentQuiz.answer && (answerChoice.length === 1) && currentQuiz.type === 'number' &&
              <input type={currentQuiz.type} name='answer' val={answered} onChange={onChange}/>
            }
            {
              currentQuiz.answer && (answerChoice.length === 1) && currentQuiz.type === 'text' &&
              <input type={currentQuiz.type} name='answer' val={answered} onChange={onChange}/>
            }
          <input type='submit'/>         
          </form>
        </div>
      } 
    </>
  )
}

export default Quiz