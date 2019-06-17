import * as React from 'react';
import { Panel } from '../Panel/Panel';
import { iPlayer } from '../../../services/Player';
import { iGesture } from '../../../models/models';
import { Button } from '../Button/Button';
import { ScoreBadge } from '../ScoreBadge/ScoreBadge';


export interface PlayerPanelProps {
    className?: string;
    player: iPlayer;
    gestures: iGesture[];
    onOptionSelected?: (gesture: iGesture, userKey: string) => void;
}

export interface PlayerPanelState {
    selectedGesture: iGesture;
}

export class PlayerPanel extends React.Component<PlayerPanelProps, PlayerPanelState>{
    el: HTMLDivElement;
    constructor(p: PlayerPanelProps) {
        super(p);
        this.state = {
            selectedGesture:null
        }
    }

    setSelectedGesture = (gesture: iGesture) => {
        if (this.props.player.type === "real") {
            this.setState({
                selectedGesture: gesture
            })
        }
    }

    confirmSelection = () => {
        this.props.onOptionSelected(this.state.selectedGesture, this.props.player.key);
    }

    render() {
        let { props, state } = this,
            cls = this.props.className || "";
        return (
            <Panel className={"player-panel " + cls + (props.player.isWinner ? " player-panel--win" : "")}>
                <ScoreBadge score={props.player.score} />
                <div className="player-panel__label">
                    <h1>
                        {props.player.label}
                    </h1>
                </div>

                {
                    props.player.userChoice &&
                    <div className="player-panel__gesture animated fadeIn speed-7">
                        <i className={props.player.userChoice.icon} />
                        <h1>{props.player.userChoice.label}</h1>
                    </div>
                }
                {
                    (props.player.type == "real" && !props.player.userChoice) &&
                    props.gestures.map((e, i) => {
                        let isActiveCls = state.selectedGesture && state.selectedGesture.key === e.key ? "button--active" : "";
                        return <div
                            className={"animated fadeInUp speed-3 delay-" + i}
                            key={e.key}
                        >
                            <Button
                                className={"player-panel__button " + isActiveCls}
                                onClick={() => {
                                    this.setSelectedGesture(e)
                                }}
                            >
                                {e.label}
                            </Button>
                        </div>
                    })
                }

                {
                    state.selectedGesture &&
                    <Button 
                        className="player-panel__button player-panel__button--confirm animated fadeInUp speed-5"
                        onClick={this.confirmSelection}>
                        Confirm
                    </Button>
                }
            </Panel>
        )
    }
}