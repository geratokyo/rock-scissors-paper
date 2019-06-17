
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IStoreState } from '../../_reducers';
import { iActionType, iGesture } from '../../models/models';
import { RouteComponentProps } from 'react-router';
import { NPCPlayer, iPlayer } from '../../services/Player';
import { GameLayout } from '../../components/layouts/GameLayout/GameLayout';
import { PlayerPanel } from '../../components/ui/PlayerPanel/PlayerPanel';
import { GameService } from '../../services/GameService';
import { ACTIONS } from '../../controllers/App/Actions';


export interface PlayerVsNpcProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    gestures: iGesture[];
    setWinningPlayer:(player:iPlayer)=>iActionType; 
}

export interface PlayerVsNpcState {
    players: iPlayer[];
    round:number; 
}


export class PlayerVsNpc extends React.Component<PlayerVsNpcProps, PlayerVsNpcState>{

    constructor(props: PlayerVsNpcProps) {
        super(props);
        if (props.gestures.length === 0) {
            this.props.history.push("/");
        }
        this.state = {
            round:0, 
            players: [
                new NPCPlayer("player-1", "Player 1", props.gestures, "real"),
                new NPCPlayer("npc-2", "NPC 2", props.gestures)
            ]
        }
    }

    /**
     * resets Player objects and updates the state
     */
    resetPlayers = () => {
        let players = this.state.players.slice();
        players.forEach((e) => {
            e.resetPlayer();
        })
        this.setState({
            players
        })
    }

    /**
     * Function to be called when the user confirms an option
     */
    playRound = (gesture: iGesture, key: string) => {

        this.resetPlayers();

        this.generateNPCGesture();
        let players = this.state.players.slice();

        // Add selected gesture for the real user to the model
        players.forEach((e) => {
            if (e.key === key) {
                e.userChoice = gesture;
            }
        });
        this.setState({
            players, 
            round:this.state.round + 1
        })

        setTimeout(() => {
            let idx = GameService.GET_WINNER(players);

            if (idx === -1) {
                this.resetPlayers();
                return;
            }
            players = this.state.players.slice();
            players[idx].isWinner = true;
            players[idx].score = players[idx].score + 1;
            this.setState({
                players
            })

            setTimeout(() => {
                if (this.gameFinished()) {
                    let player:iPlayer = this.getWinningPlayer(); 
                    this.props.setWinningPlayer(player); 
                    this.props.history.push("/result")
                    return;
                }
                this.resetPlayers();
            }, 1000)
        }, 1000)
    }

    /**
     * Get the player who has reach the score of 3
     * @returns {iPlayer}
     */
    getWinningPlayer = ():iPlayer=>{
        let res = null; 
        this.state.players.forEach((e)=>{
            if(e.score === 3){
                res = e;
            }
        })
        return res;
    }
    
    /**
     * check if the game has finished
     * @returns {boolean}
     */
    gameFinished = (): boolean => {
        let res = false;
        this.state.players.forEach((e) => {
            res = res || e.score === 3;
        })
        return res
    }

    /**
     * Generates the Gestures for the NPC players
     */
    generateNPCGesture = () => {
        this.state.players.forEach((e) => {
            if (e.type === "npc") {
                e.generateResponse();
            }
        })
    }

    render() {
        let { props, state } = this;
        let cls = this.props.className || "";
        return (
            <GameLayout className={"player-vs-npc " + cls}>
                {
                    state.players.map((e, i) => {
                        return <PlayerPanel
                            className={"animated zoomIn speed-4 delay-" + i}
                            gestures={props.gestures}
                            key={i+ state.round}
                            player={e}
                            onOptionSelected={this.playRound}
                        />
                    })
                }

            </GameLayout>
        )
    }
}




const mapStateToProps = (state: IStoreState, ownProps): Partial<PlayerVsNpcProps> => {
    return {
        gestures: state.app.gestures
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setWinningPlayer:ACTIONS.SET_WINNER
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlayerVsNpc);