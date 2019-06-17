import { iPlayer } from "./Player";


/**
 * This class holds the functions responsible for the game rules
 */
export class GameService {
    /**
     * Returns the index of the winning player in a round
     */
    static GET_WINNER = (players: iPlayer[]): number => {
        let res = -1;
        if (players[0].userChoice) {

            // if it is a draw
            if (players[0].userChoice.key === players[1].userChoice.key) {
                return res;
            }

            // get the index of the winning player 
            if (players[0].userChoice.beats.indexOf(players[1].userChoice.key) >= 0) {
                res = 0
            } else {
                res = 1
            }
        }
        return res;
    }
}