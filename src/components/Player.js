import React, {Component} from 'react';
import { playTennis, cleanAllPoints } from '../actions'
import { beautifyScore } from '../utils/helpers'
import {connect} from 'react-redux';
import {
    Container,
    Button,
    Table,
    Header
} from 'semantic-ui-react'


class Player extends Component{

  render() {
    const { players } = this.props
    const player1 = players.player1.gamePoints
    const player2 = players.player2.gamePoints
    const minitiebreak_player1 = players.player1.minitiebreak
    const minitiebreak_player2 = players.player2.minitiebreak


    return (
<Container>
  <Table celled structured>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Player</Table.HeaderCell>
        <Table.HeaderCell>Sets</Table.HeaderCell>
        <Table.HeaderCell>Gems</Table.HeaderCell>
        <Table.HeaderCell>Game</Table.HeaderCell>
        <Table.HeaderCell>Actions</Table.HeaderCell>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>Player1</Header>
        </Table.Cell>
        <Table.Cell textAlign='center'singleLine>{players.player1.setPoints}</Table.Cell>
        <Table.Cell textAlign='center'>{players.player1.gemPoints}</Table.Cell>
        <Table.Cell textAlign='center'>{beautifyScore(player1,player2, minitiebreak_player1)}</Table.Cell>
        <Table.Cell textAlign='center'><Button onClick={() => this.props.playTennis("player1")}>Player1 scored</Button></Table.Cell>
      </Table.Row>
      <Table.Row>
        <Table.Cell>
          <Header as='h2' textAlign='center'>Player2</Header>
        </Table.Cell>
        <Table.Cell textAlign='center' singleLine>{players.player2.setPoints}</Table.Cell>
        <Table.Cell textAlign='center'>{players.player2.gemPoints}</Table.Cell>
        <Table.Cell textAlign='center'>{beautifyScore(player2,player1, minitiebreak_player2)}</Table.Cell>
        <Table.Cell textAlign='center'><Button onClick={() => this.props.playTennis("player2")}>Player2 scored</Button></Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>

  <Table celled padded>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell singleLine>Actions</Table.HeaderCell>
        <Table.HeaderCell>Winner</Table.HeaderCell>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      <Table.Row>
        <Table.Cell textAlign='center'>
          <Button onClick={() => this.props.resetGame() }>Reset Game</Button>
        </Table.Cell>
        <Table.Cell textAlign='center'>
         {(players.player2.winner && 'Player2!')|| (players.player1.winner && 'Player1!')}
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table>


</Container>
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
