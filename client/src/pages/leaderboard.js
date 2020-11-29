import React, {useEffect} from 'react'
import { Table } from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {fetchLeaderboard} from '../store/action/action'
import {useHistory} from 'react-router-dom'
function Leaderboard(){

  const leaderboard = useSelector(state => state.leaderboard)
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if(!token){
      history.push('/')
    } else {
      dispatch(fetchLeaderboard())
    }
  }, [dispatch, history])
  
  return (
    <div>
      <h1 className="center">Leaderboard</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Highscore</th>
          </tr>
        </thead>
        <tbody>
          {
            leaderboard && 
            leaderboard.map((lead, idx) => (
              <tr key={idx}>
                <td>{idx + 1}</td>
                <td>{lead.username}</td>
                <td>{lead.highest_score}</td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}

export default Leaderboard