
import * as ReactRedux from 'react-redux'; 
import { iActionType, Dictionary, iGesture } from '../../models/models';
import { iPlayer } from '../../services/Player';
export const STATE_KEY = 'app';


export interface AppProps extends ReactRedux.DispatchProp<any>{
	appState:AppState;
	loadData:(e)=>iActionType;
	// componentName:string;
	// isMobile:boolean; 
	// injector:any;
	// dataService:DataService;
}
export enum WINDOW_VIEWS {
	SPLASH, 
	CONTENT
}

export interface AppState{
	gestures:iGesture[];
	winningPlayer:iPlayer;
}
export const AppInitState:AppState = {
	gestures:[],
	winningPlayer:null
}

export interface inAppState{
}

export const inAppInitialState:inAppState = {
}
