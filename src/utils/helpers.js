export function winGem(player1GamePoints, player2GamePoints) {
    return (player1GamePoints >= 4 && player1GamePoints - player2GamePoints >= 2)
}

export function wonSet(player1GemPoints, player2GemPoints) {
    return ((player1GemPoints === 6 && player1GemPoints - player2GemPoints >= 2) || (player1GemPoints === 7 && player2GemPoints === 6) || (player1GemPoints === 7 && player2GemPoints === 5))
}

export function playingTieBreak(player1SetPoints, player2SetPoints, player1Gems, player2Gems) {
    return (player1SetPoints === 2 && player2SetPoints === 2 && player1Gems === 6 && player2Gems === 6)
}

export function playingMiniTieBreak(player1GemPoints, player2GemPoints) {
    return (player1GemPoints === 6 && player2GemPoints === 6)
}

export function wonMiniTieBreak(player1GamePoints, player2GamePoints) {
    return ((player2GamePoints >= 7 || player2GamePoints === 6) && player2GamePoints - player1GamePoints >= 2)
}

export function wonTieBreak(player1GemPoints, player2GemPoints) {
    return (player1GemPoints - player2GemPoints === 2)
}
export function wonMatch(player1SetPoints, player2SetPoints) {
    return (player1SetPoints === 3 || player1SetPoints - player2SetPoints > 2)
}

export function isDeuce(player1Points, player2Points){
    return ((player1Points === 3 && player2Points === 3) || (player1Points > 3 && player1Points === player2Points))
  }

export const  beautifyScore = (player1,player2,minitiebreak) => {

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
