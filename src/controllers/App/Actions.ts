import { APP_START } from '../../constants';
import { WINDOW_VIEWS } from './StateAndProps';
import { iPlayer } from '../../services/Player';


export const TYPES = {
    DATA_LOADED: APP_START | 0x00001,
    SET_WINNER: APP_START | 0x00002,
};

export const ACTIONS = {
    DATA_LOADED: function (a: any) {
        return {
            type: TYPES.DATA_LOADED,
            data: a
        };
    },
    SET_WINNER: (player: iPlayer) => {
        return {
            type: TYPES.SET_WINNER,
            data: player
        }
    }


};