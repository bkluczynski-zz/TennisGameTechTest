import {
    winGem,
    wonTieBreak,
    wonMiniTieBreak,
    wonMatch,
    wonSet,
    playingMiniTieBreak,
    playingTieBreak,
    isDeuce
} from '../utils/helpers'
export const GIVE_POINT = 'GIVE_POINT'
export const GIVE_GEM = 'GIVE_GEM'
export const GIVE_SET = 'GIVE_SET'
export const SHOULD_GET_GEM = 'SHOULD_GET_GEM'
export const CLEAN_POINTS = 'CLEAN_POINTS'
export const CLEAN_POINTS_IN_GEM = 'CLEAN_POINTS_IN_GEM'
export const MINI_TIE = 'MINI_TIE'
export const DEACTIVE_MINI_TIE = 'DEACTIVE_MINI_TIE'
export const TIE_BREAK = 'TIE_BREAK'
export const DEACTIVE_TIE_BREAK = 'DEACTIVE_TIE_BREAK'
export const WINNER = 'WINNER'
export const CLEAN_POINTS_IN_SET = 'CLEAN_POINTS_IN_SET'
export const RESET_WINNER = 'RESET_WINNER'
export const DEUCE = 'DEUCE'

export function giveSet(player) {
    return {type: GIVE_SET, player}
}

export function shouldGetGem(player) {
    return {type: SHOULD_GET_GEM, player}
}

export function cleanGamePoints(player) {
    return {type: CLEAN_POINTS, player}
}

export function cleanGemPoints(player) {
    return {type: CLEAN_POINTS_IN_GEM, player}
}

export function cleanSetPoints(player) {
    return {type: CLEAN_POINTS_IN_SET, player}
}

export function giveGem(player) {
    return {type: GIVE_GEM, player}
}

export function givePoint(player) {
    return {type: GIVE_POINT, player}
}

export function gemWinner(player) {
    return (dispatch) => {
        dispatch(cleanGamePoints("player1"))
        dispatch(cleanGamePoints("player2"))
        dispatch(giveGem(player))
    }
}

export function setWinner(player) {
    return (dispatch) => {
        dispatch(cleanGamePoints("player1"))
        dispatch(cleanGamePoints("player2"))
        dispatch(cleanGemPoints("player1"))
        dispatch(cleanGemPoints("player2"))
        dispatch(giveSet(player))
    }
}

export function callOffWinner(player) {
    return {type: RESET_WINNER, player}
}

export function cleanAllPoints() {
    return (dispatch) => {
        dispatch(callOffWinner("player1"))
        dispatch(callOffWinner("player2"))
        dispatch(cleanGamePoints("player1"))
        dispatch(cleanGamePoints("player2"))
        dispatch(cleanGemPoints("player1"))
        dispatch(cleanGemPoints("player2"))
        dispatch(cleanSetPoints("player1"))
        dispatch(cleanSetPoints("player2"))
        deactivateMiniTieBreak("player1")
        deactivateMiniTieBreak("player2")
        deactivateTieBreak("player1")
        deactivateMiniTieBreak("player2")
    }
}

export function announceTheWinner(player) {
    return (dispatch) => {
        dispatch({type: WINNER, player})
    }
}

export function activateMiniTieBreak(player) {
    return {type: MINI_TIE, player}
}

export function deactivateMiniTieBreak(player) {
    return {type: DEACTIVE_MINI_TIE, player}
}

export function activateTieBreak(player) {
    return {type: TIE_BREAK, player}
}

export function deactivateTieBreak(player) {
    return {type: DEACTIVE_TIE_BREAK, player}
}

export function deuce(){
  return {type: DEUCE}
}

export function playTennis(player) {
    return (dispatch, getState) => {
        let players;
        players = getState();
        console.log("state 0 before scoring the point", players.players.player1, players.players.player2)

        if (players.players.player1.tiebreak && players.players.player2.tiebreak) {
            console.log("it's a tie break people")
            dispatch(givePoint(player))
            players = getState();

            if (winGem(players.players.player1.gamePoints, players.players.player2.gamePoints) || (winGem(players.players.player2.gamePoints, players.players.player1.gamePoints))) {
                dispatch(gemWinner(player))
            }
            players = getState();

            if (wonTieBreak(players.players.player1.gemPoints, players.players.player2.gemPoints) || wonTieBreak(players.players.player2.gemPoints, players.players.player1.gemPoints)) {
                dispatch(setWinner(player))
                dispatch(announceTheWinner(player))
            }

        } else {

            if (players.players.player1.minitiebreak && players.players.player2.minitiebreak) {
                dispatch(givePoint(player))
                players = getState();

                if (wonMiniTieBreak(players.players.player1.gamePoints, players.players.player2.gamePoints) || (wonMiniTieBreak(players.players.player2.gamePoints, players.players.player1.gamePoints))) {
                    dispatch(setWinner(player))
                    dispatch(deactivateMiniTieBreak("player1"))
                    dispatch(deactivateMiniTieBreak("player2"))
                }
                players = getState();

                if (wonMatch(players.players.player1.setPoints, players.players.player2.setPoints) || wonMatch(players.players.player2.setPoints, players.players.player1.setPoints)) {
                    dispatch(announceTheWinner(player))
                }

            } else {

                dispatch(givePoint(player))
                players = getState();
                console.log("state 1 before winning the gem", players.players.player1, players.players.player2)
                //one of the players wins a gem

                if (winGem(players.players.player1.gamePoints, players.players.player2.gamePoints) || (winGem(players.players.player2.gamePoints, players.players.player1.gamePoints))) {
                    dispatch(gemWinner(player))
                }
                //update the state after giving a gem
                players = getState();
                console.log("state 2 after winning the gem", players.players.player1, players.players.player2)

                //one of the players wins a setState
                if (wonSet(players.players.player1.gemPoints, players.players.player2.gemPoints) || (wonSet(players.players.player2.gemPoints, players.players.player1.gemPoints))) {
                    dispatch(setWinner(player))
                }
                //update the state after giving a set
                players = getState();
                console.log("state 3 after winning the set", players.players.player1, players.players.player2)

                if (playingMiniTieBreak(players.players.player1.gemPoints, players.players.player2.gemPoints)) {
                    // dispatch(playTieBreak(player))
                    dispatch(activateMiniTieBreak("player1"))
                    dispatch(activateMiniTieBreak("player2"))
                }

                if (playingTieBreak(players.players.player1.setPoints, players.players.player2.setPoints, players.players.player1.gemPoints, players.players.player2.gemPoints)) {
                    dispatch(activateTieBreak("player1"))
                    dispatch(activateTieBreak("player2"))
                    console.log("i m playing tiebreak!")
                }

                if (wonMatch(players.players.player1.setPoints, players.players.player2.setPoints) || wonMatch(players.players.player2.setPoints, players.players.player1.setPoints)) {
                    dispatch(announceTheWinner(player))
                }

            }

        }

    }
}
