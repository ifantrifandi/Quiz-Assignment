import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {setIndex, setQuestionStatus, setScore, newHighScore, setMessage} from '../store/action/action'
import {useHistory} from 'react-router-dom'
import {Container, Col, Row, InputGroup, FormControl} from 'react-bootstrap'

function Quiz () {

  const dispatch = useDispatch()
  const history = useHistory()
  const [answerChoice, setAnswerChoice] = useState([])
  const [answered, setAnswered] = useState('');
  const [checkBoxAnswer, setCheckBoxAnswer] = useState([])
  const [image, setImage] = useState([])
  const [loopImage, setLoopImage] = useState([])
  const currentQuiz = useSelector(state => state.currentQuiz)
  const index = useSelector(state => state.index)
  const score = useSelector(state => state.score)
  const questionStatus = useSelector(state => state.questionStatus)
  const randomQuiz = useSelector(state => state.randomQuiz)

  useEffect(() => {
    dispatch(setMessage(''))
    setAnswered('')
    setCheckBoxAnswer([])
    
    for(let i = 0 ; i < document.getElementsByClassName('checkbox').length; i++ ) {
      document.getElementsByClassName('checkbox')[i].checked = false
    }

    for(let i = 0 ; i < document.getElementsByClassName('radio').length; i++ ) {
      document.getElementsByClassName('radio')[i].checked = false
    }


    if(currentQuiz && !currentQuiz.image_question) {
      setImage([])
    }

    if(currentQuiz && !currentQuiz.image_loop) {
      setLoopImage([])
    }
    if(currentQuiz && currentQuiz.answer) {
      let choiceTemp = currentQuiz.answer.split('%')
      setAnswerChoice(choiceTemp)
    }
    if(currentQuiz && currentQuiz.image_question) {
      let imageQuestion = currentQuiz.image_question.split('%')
      setImage(imageQuestion)
    }

    if(currentQuiz && currentQuiz.image_loop) {
      let number = currentQuiz.image_loop
      let newArray = Array(number).fill('')
      setLoopImage(newArray)
    }

  }, [currentQuiz])

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if(!token){
      history.push('/')
    }

    if(index > 1 && (index % 10) === 0 && questionStatus.length > 1) {
      let highScore = localStorage.getItem('highest_score')
      
      if(score > highScore) {
        dispatch(newHighScore(score))
      }
      history.push('/status')
    }
  }, [index, history])
  
  function onChange(e) {

    if(e.target.type === 'checkbox') {
      if(e.target.checked === true) { 
        setCheckBoxAnswer([...checkBoxAnswer, e.target.value])
      } else {
        let newCheckBoxAnswer = checkBoxAnswer.filter(el => el !== e.target.value)
        setCheckBoxAnswer(newCheckBoxAnswer)
      }
    } else {
      setAnswered(e.target.value)
    }

  }

  function submit(e) {
    e.preventDefault()
      dispatch(setIndex(index + 1))
    let newIndex

    if(index > 9) {
      newIndex = (index % 10) + 1
    } else {
      newIndex = index + 1
    }
    
    if(answered) {

      if(answered.toLowerCase() === currentQuiz.correct_answer.toLowerCase()) {
        dispatch(setScore(score + currentQuiz.score))
        dispatch(setQuestionStatus([...questionStatus, [`Pertanyaan ke ${newIndex}`, true ]]))
      } else {
        dispatch(setQuestionStatus([...questionStatus, [`Pertanyaan ke ${newIndex}`, false ]]))
      }

    } else if (checkBoxAnswer) {
      let correctAnswer = currentQuiz.correct_answer.split('%')
      let isCorrect = false
      let count = 0
      for(let i = 0 ; i < checkBoxAnswer.length; i++) {

        for(let j = 0; j < correctAnswer.length; j++) {
          if(checkBoxAnswer[i].toLowerCase() === correctAnswer[j].toLowerCase()){
            count += 1
          }
        }

        if(count === correctAnswer.length) {
          isCorrect = true
        }
      }

      if(isCorrect) {
        dispatch(setScore(score + currentQuiz.score))
        dispatch(setQuestionStatus([...questionStatus, [`Pertanyaan ke ${newIndex}`, true ]]))

      } else {
        dispatch(setQuestionStatus([...questionStatus, [`Pertanyaan ke ${newIndex}`, false ]]))
      }
    }
  }

  return(
    <>
      {
        currentQuiz && 
        <Container fluid className="center">
          <div className="question-box">
            <h4>Pertanyaan ke - {
              (index > 9 ? ((index % 10) +1) : index + 1)
            }</h4>
            <h5><b>Skor Kamu : {score}</b></h5>
            <h3>
              {currentQuiz.question}
            </h3>
          </div>
          <Container>
            <Row>
              {
                image && !currentQuiz.image_loop &&
                image.map((im, idx) => {
                  if(image.length > 3) {
                    return <Col key={idx} xs={6} sm={6} md={3} lg={3} xl={3} className="no-padding">
                      <img src={im} alt='imagequestion' className="image-question"/>
                    </Col>
                  } else {
                    return <Col key={idx} xs={12} sm={12} md={12} lg={12} xl={12} className="no-padding">
                      <img src={im} alt='imagequestion' className="image-question"/>
                    </Col>
                  }
                  
                }
                )
              }
            </Row>
            <Row>
              {
                (loopImage.length > 1) && loopImage.map((el, idx) => (
                  <Col key={idx} xs={6} sm={6} md={3} lg={3} xl={3} className="no-padding">
                    <img src={currentQuiz.image_question} alt='imagequestion' className="image-question"/>
                  </Col>
                ))
              }
            </Row>
          </Container>
          <form onSubmit={submit}>
            <div className="width-20 margin-center font-20">
              <div className="question-answer">
                {
                  currentQuiz.answer && (answerChoice.length > 1) && (currentQuiz.type === 'radio') &&
                  answerChoice.map((ans, idx) => (
                    <div key={idx} className="question-choice-answer">
                      <input type={currentQuiz.type} name='answer' value={ans} onChange={onChange} className="radio"/> 
                      <label className="ml-2">{ans}</label> 
                    </div>
                  ))
                }
              </div>
              <div className="question-answer">
                {
                  currentQuiz.answer && (answerChoice.length > 1) && (currentQuiz.type === 'checkbox') &&
                  answerChoice.map((ans, idx) => (
                    <div key={idx} className="question-choice-answer">
                      <input type={currentQuiz.type} name='answer' value={ans} onChange={onChange} className="checkbox"/> 
                      <label className="ml-2">{ans}</label> 
                    </div>
                  ))
                }
              </div>
              {
                currentQuiz.answer && (answerChoice.length === 1) && currentQuiz.type === 'number' &&
                <input type={currentQuiz.type} name='answer' val={answered} onChange={onChange} placeholder='Type Here'/>
              }
              {
                currentQuiz.answer && (answerChoice.length === 1) && currentQuiz.type === 'text' &&
                <input type={currentQuiz.type} name='answer' val={answered} onChange={onChange} placeholder='Type Here'/>
              }
          </div>
          <InputGroup  className="fixed width-50 margin-left-25">
            <FormControl type="submit" value="Jawab" className="margin-center"/>
          </InputGroup>   
          </form>
        </Container>
      } 
      {
        !randomQuiz && 
        <div>
          <h1> No More Question</h1>
        </div>
      }
    </>
  )
}

export default Quiz