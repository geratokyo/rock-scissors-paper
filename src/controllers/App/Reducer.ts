import { TYPES } from './Actions';
import { AppState, AppInitState } from './StateAndProps';


export function Reducer(state = AppInitState, action): any {
	switch (action.type) {
		case TYPES.DATA_LOADED:
			state.gestures = action.data
		return {...state}
		case TYPES.SET_WINNER:
			state.winningPlayer = action.data;
			return {...state}
		default:
			return state;
	}

}


