
import * as React from 'react';
import * as ReactRedux from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { IStoreState } from '../../_reducers';
import { iActionType, iGesture } from '../../models/models';
import { RouteComponentProps } from 'react-router';
import { PlayerPanel } from '../../components/ui/PlayerPanel/PlayerPanel';
import { GameLayout } from '../../components/layouts/GameLayout/GameLayout';
import { NPCPlayer, iPlayer } from '../../services/Player';
import { GameService } from '../../services/GameService';
import { ACTIONS } from '../../controllers/App/Actions';


export interface NpcVsNpcProps extends ReactRedux.DispatchProp<any>, RouteComponentProps<any> {
    className?: string;
    gestures: iGesture[];
    setWinningPlayer: (player: iPlayer) => iActionType;
}


export interface NpcVsNpcState {
    players: iPlayer[];
}


export class NpcVsNpc extends React.Component<NpcVsNpcProps, NpcVsNpcState>{

    constructor(props: NpcVsNpcProps) {
        super(props);
        if (props.gestures.length === 0) {
            this.props.history.push("/");
        }
        this.state = {
            players: [
                new NPCPlayer("npc-1", "NPC 1", props.gestures),
                new NPCPlayer("npc-2", "NPC 2", props.gestures)
            ]
        }
    }


    componentDidMount() {
        this.goToNextRound();
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
     * Recursive function which simulates the NPC Game
     */
    goToNextRound = () => {
        if (this.gameFinished()) {
            let player: iPlayer = this.getWinningPlayer();
            this.props.setWinningPlayer(player);
            this.props.history.push("/result")
            return;
        }
        this.resetPlayers();

        setTimeout(() => {
            this.generateNPCGesture();
            let players = this.state.players.slice();
            this.setState({
                players
            })

            setTimeout(() => {
                let idx = GameService.GET_WINNER(this.state.players);
                if (idx === -1) {
                    this.goToNextRound();
                    return;
                }
                let players = this.state.players.slice();
                players[idx].isWinner = true;
                players[idx].score = players[idx].score + 1;
                this.setState({
                    players
                })

                setTimeout(() => {
                    this.goToNextRound()
                }, 1500)
            }, 1500)
        }, 1000)

    }

    /**
     * Get the player who has reach the score of 3
     * @returns {iPlayer}
     */
    getWinningPlayer = (): iPlayer => {
        let res = null;
        this.state.players.forEach((e) => {
            if (e.score === 3) {
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
            <GameLayout className={"npc-vs-npc " + cls}>
                {
                    state.players.map((e, i) => {
                        return <PlayerPanel
                            className={"animated zoomIn speed-4 delay-" + i}
                            gestures={props.gestures}
                            key={i}
                            player={e}
                        />
                    })
                }
            </GameLayout>
        )
    }
}




const mapStateToProps = (state: IStoreState, ownProps): Partial<NpcVsNpcProps> => {
    return {
        gestures: state.app.gestures
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
    setWinningPlayer: ACTIONS.SET_WINNER
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NpcVsNpc);