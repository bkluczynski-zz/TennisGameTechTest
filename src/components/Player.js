import React, {Component} from 'react';
import { playTennis, cleanAllPoints } from '../actions'
import { isDeuce } from '../utils/helpers'
import {connect} from 'react-redux';



class Player extends Component{


  beautifyScore = (player1,player2,minitiebreak) => {

    if (minitiebreak){
      return player1
    } else {
      if (player1 === 0 ) {
        return 0
      } else if (player1 === 1) {
        return 15
      } else if (player1 === 2) {
        return 30
      } else if (player1 === 3) {
        return 40
      } else if (player1 >= 4 ) {
        if (isDeuce(player1,player2)){
          console.log("it's a DEUCE")
          return "40"
        }
        if (player1 > player2){
          return "A"
        } else if (player1 < player2){
          return "40"
        }

        }
    }

  }


  render() {
    const { players, playTennis } = this.props
    const player1 = players.player1.gamePoints
    const player2 = players.player2.gamePoints
    const minitiebreak_player1 = players.player1.minitiebreak
    const minitiebreak_player2 = players.player2.minitiebreak


    return (
      <div>
        <div>Player1</div>
          <div>Current game points : {this.beautifyScore(player1,player2, minitiebreak_player1)}</div>
          {console.log("player one score", players.player1.gamePoints )}
          <div>Gems won : {players.player1.gemPoints}</div>
          <div>Sets won: {players.player1.setPoints}</div>

        <br></br>
        <div>Player2</div>
          <div>Current game points : {this.beautifyScore(player2,player1, minitiebreak_player2 )}</div>
            {console.log("player two score", players.player2.gamePoints )}
          <div>Gems won : {players.player2.gemPoints}</div>
          <div>Sets won: {players.player2.setPoints}</div>
          <button onClick={() => this.props.playTennis("player1")}>Player1 scored</button>
          <button onClick={() => this.props.playTennis("player2")}>Player2 scored</button>
          <br></br>

        <div>Winner is... {(players.player2.winner && 'Player2!')|| (players.player1.winner && 'Player1!')} </div>
        <button onClick={() => this.props.resetGame() }>Reset Game</button>
      </div>
    )
  }
}
  const mapDispatchToProps = dispatch=> ({
    playTennis: (player) => dispatch(playTennis(player)),
    resetGame:() => dispatch(cleanAllPoints())
    })

  const mapStateToProps = (state,props) => ({
    players : state.players
  })



    export default connect(mapStateToProps, mapDispatchToProps)(Player)
