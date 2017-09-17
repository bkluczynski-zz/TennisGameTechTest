import { GIVE_POINT, GIVE_GEM, GIVE_SET, SHOULD_GET_GEM, CLEAN_POINTS, CLEAN_POINTS_IN_GEM, MINI_TIE, DEACTIVE_MINI_TIE, TIE_BREAK, DEACTIVE_TIE_BREAK, WINNER, CLEAN_POINTS_IN_SET, RESET_WINNER, DEUCE } from '../actions'

const initialState = {
      players: {
          player1: {
              gamePoints: 0,
              gemPoints: 0,
              setPoints: 0,
              winner: false,
              minitiebreak: false,
              tiebreak: false,
          },
          player2: {
              gamePoints: 0,
              gemPoints: 0,
              setPoints: 0,
              winner: false,
              minitiebreak: false,
              tiebreak: false,
          }
      },
      game: {
        deuce : false,
        advantage : false,
      }
}

function players(state = initialState, action){
  switch(action.type){
    case GIVE_POINT :

    return {
      ...state,
      players : {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          gamePoints : state.players[action.player].gamePoints + 1
        }
      }
    }

    case GIVE_GEM :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
            gemPoints : state.players[action.player].gemPoints + 1

        }
      }
    }

    case GIVE_SET :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
            setPoints : state.players[action.player].setPoints + 1
        }
      }
    }

    case SHOULD_GET_GEM :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          shouldGetGem : true
        }
      }
    }

    case CLEAN_POINTS :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          gamePoints : 0
        }
      }
    }

    case CLEAN_POINTS_IN_GEM :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          gemPoints : 0
        }
      }
    }

    case CLEAN_POINTS_IN_SET :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          setPoints : 0
        }
      }
    }

    case MINI_TIE :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          minitiebreak : true
        }
      }
    }

    case DEACTIVE_MINI_TIE :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          minitiebreak : false
        }
      }
    }

    case TIE_BREAK :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          tiebreak : true
        }
      }
    }

    case DEACTIVE_TIE_BREAK :
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          tiebreak : false
        }
      }
    }

    case WINNER:
    return {
      ...state,
      players: {
        ...state.players,
        [action.player] : {
          ...state.players[action.player],
          winner : true
        }
      }
    }

    case RESET_WINNER:
    return {
    ...state,
    players: {
      ...state.players,
      [action.player] : {
        ...state.players[action.player],
        winner : false
      }
    }
  }

  case DEUCE:
  return {
    ...state,
    game: {
      ...state.game,
      deuce : true
    }
  }



     default :
     return state;

  }

}

export default players;
